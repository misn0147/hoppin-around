import React, { useState } from "react";
import { Modal, Button, Row } from "react-bootstrap";

function Brewery({ brewery }) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const { id, name, city, phone,  state,  website_url } =
        brewery;

    const formatNumber = (phoneString) => {
        let cleaned = ("", phoneString).replace(/\D/g, "");
        let match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
        if (match) {
            return "(" + match[1] + ") " + match[2] + "-" + match[3];
        }
        return null;
    };

    const breweryAddress =
        brewery.street +
        ", " +
        brewery.city +
        ", " +
        brewery.state +
        " " +
        brewery.postal_code;

    return (
        <>
            <button
                key={id}
                className="list-group-item list-group-item-secondary container"
                onClick={handleShow}
            >
                <div className="row">
                    <div className="col">{name}</div>
                    <div className="col">
                        {city}, {state}
                    </div>
                </div>
            </button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <a
                            className="mr-2 text-decoration-none"
                            href={
                                "https://www.google.com/maps/place/" +
                                breweryAddress
                            }
                            rel="noopener noreferrer"
                            target="_blank"
                            aria-label="Brewery address"
                        >
                            📍 {breweryAddress}
                        </a>
                    </Row>
                    <Row>
                        {website_url ? (
                            <a
                                className="mr-2 text-decoration-none"
                                aria-label="Brewery website"
                                href={website_url}
                                target="_blank"
                                rel="noreferrer"
                            >
                                🌐 {website_url}
                            </a>
                        ) : (
                            <span>🌐 None</span>
                        )}
                    </Row>

                    <Row>
                        {phone ? (
                            <a
                                className="mr-2 text-decoration-none"
                                aria-label="Brewery phone number"
                                href={"tel:" + formatNumber(phone)}
                            >
                                📞 {formatNumber(phone)}
                            </a>
                        ) : (
                            <span>📞 Not available</span>
                        )}
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
export default Brewery;
