import { informacionMedicamentos } from '../variables/informacionMedicamentos'

export const InformacionMedicamentos = () => {
  return (
    <>
        <Card
            style={{
                width: '18rem'
            }}
            >
           {
            informacionMedicamentos.map( informacionM => (
                <CardBody>
                    <CardTitle tag="h5" key={ informacionM.id } >
                    { informacionM.title}
                    </CardTitle>
                    <CardSubtitle
                    className="mb-2 text-muted"
                    tag="h6"
                    >
                    {informacionM.descripcion }
                    </CardSubtitle>
                    <CardText>
                    Some quick example text to build on the card title and make up the bulk of the card‘s content.
                    </CardText>
                    <Button>
                    Button
                    </Button>
                </CardBody>
            ))
           }
            
        </Card>
    </>
  )
}
