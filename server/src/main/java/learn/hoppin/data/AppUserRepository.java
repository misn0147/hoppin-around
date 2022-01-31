package learn.hoppin.data;

import learn.hoppin.models.AppUser;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.transaction.annotation.Transactional;

import java.sql.PreparedStatement;
import java.sql.Statement;
import java.util.List;
import java.util.Objects;

public class AppUserRepository {

    private final JdbcTemplate jdbcTemplate;

    public AppUserRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public List<AppUser> findAll(){
        return jdbcTemplate.query("Select app_user_id, username, '' password_hash, "
                + "disabled from app_user;", mapper);
    }

    public List<String> findAllRoles(){
        return jdbcTemplate.query("select * from app_role;",
                (rs, i) -> rs.getString("name"));
    }

    @Transactional
    public AppUser findByUsername(String username){
        AppUser user = jdbcTemplate.query(
                        "select * from app_user where username = ?;",
                            mapper, username).stream()
                .findFirst().orElse(null);

        if (user != null){
            var authorities = getAuthorities(user.getId());
            user.setAuthorityNames(authorities);
        }

        return user;
    }

    @Transactional
    public AppUser findByAppUserId(int id){
        AppUser user = jdbcTemplate.query(
                "select * from app_user where app_user_id = ?;",
                mapper, id).stream()
                .findFirst()
                .orElse(null);

        if (user != null){
            var authorities = getAuthorities(user.getId());
            user.setAuthorityNames(authorities);
        }

        return user;
    }

    public AppUser add(AppUser user){

        final String sql = "insert into app_user (username, password_hash) values (?,?);";

        KeyHolder keyHolder = new GeneratedKeyHolder();
        int rowsAffected = jdbcTemplate.update(conn -> {
            PreparedStatement statement = conn.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            statement.setString(1, user.getUsername());
            statement.setString(2, user.getPassword());
            return statement;
        }, keyHolder);

        if (rowsAffected <= 0){
            return null;
        }

        user.setId(Objects.requireNonNull(keyHolder.getKey()).intValue());

        return user;
    }

    @Transactional
    public boolean update(AppUser user){

        String sql = "update app_user set "
                + "username = ?, "
                + "disabled = ? "
                + "where app_user_id = ?;";

        int rowsAffected = jdbcTemplate.update(sql,
                user.getUsername(),
                !user.isEnabled(),
                user.getId());

        if (rowsAffected > 0){
            setAuthorities(user);
            return true;
        }

        return false;
    }

    public boolean changePassword (AppUser user){

        String sql = "update app_user set "
                + "password_has = ? "
                + "where app_user_id = ?;";

        int rowsAffected = jdbcTemplate.update(sql,
                user.getPassword(),
                user.getId());

        return rowsAffected > 0;
    }

    private List<String> getAuthorities(int appUserId){

        String sql = "select r.app_role_id, r.name "
                + "from app_user_role a "
                + "inner join app_role r on a.app_role_id = r.app_role_id "
                + "where a.app_user_id = ?";

        return jdbcTemplate.query(sql,
                (rs, i) -> rs.getString("name"),
                appUserId);
    }

    private void setAuthorities(AppUser user){

        jdbcTemplate.update("delete from app_user_role where app_user_id = ?;", user.getId());

        for(var name : user.getAuthorityNames()){
            String sql = "insert into app_user_role (app_user_id, app_role_id) "
                    + "values (?, (select app_role_id from app_role where name = ?));";
            jdbcTemplate.update(sql, user.getId(), name);
        }
    }

    private final RowMapper<AppUser> mapper = (rs, i) -> {
        AppUser appUser = new AppUser();
        appUser.setId(rs.getInt("app_user_id"));
        appUser.setUsername(rs.getString("username"));
        appUser.setPassword(rs.getString("password_hash"));
        appUser.setDisabled(rs.getBoolean("disabled"));
        return appUser;
    };
}
