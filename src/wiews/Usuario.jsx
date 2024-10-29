import React from 'react'
import { useSelector } from 'react-redux';
import { Col, CardBody, Card, } from "reactstrap";

export const Usuario = () => {

    const { displayName, photoURL, status } = useSelector( status => status.auth)
  return (
    <>
        <div className="content">
            <Col>
                <Card className="card-user animate__animated animate__backInDown">
                <div className="image">
                    <img alt="..." src="../src/assets/img/damir-bosnjak.jpg"/>
                </div>
                <CardBody>
                    <div className="author">
                        <img
                        alt="NO TIENE FOTO"
                        className="avatar "
                        src={ photoURL }
                        />
                        <h5 className="title">{ displayName }</h5>
                    </div>
                    <h6 className=" text-center">
                        <strong>
                            usuario:
                        </strong>
                    <small>{ status }</small>
                    </h6>
                </CardBody>
                </Card>
            </Col>
        </div>
    </>
  )
}
