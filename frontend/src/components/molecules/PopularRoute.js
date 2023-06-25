import {
    Card,
    CardBody,
    Image,
    Text
} from "@chakra-ui/react"

function PopularRoute(props){
    return(
        <Card width="300px" p="0px" borderRadius="lg">
            <CardBody p="0px">
                <Image
                borderTopRadius="lg"
                    src={props.routeImage}
                />
                <Text fontWeight="bold" textAlign="center" py="15px" mb="0px">
                    {props.routeText}
                </Text>
            </CardBody>
        </Card>
    )
}

export default PopularRoute