import { 
    Card, 
    CardHeader, 
    CardBody, 
    Stack,
    Heading,
    Radio,
    StackDivider,
    RadioGroup
} from '@chakra-ui/react'

function PaymentMethod(){
    return(
        <Card>
            <CardHeader bg="gray.200" py="15px">
                <Heading fontSize='1.15rem' mb="0px">Choose Payment Method</Heading>
            </CardHeader>
            <CardBody pt="15px"> 
                <RadioGroup>        
                    <Stack spacing='15px' divider={<StackDivider/>}>
                        <Radio value='1'>FPX (Malaysia Online Bank Transfer)</Radio>
                        <Radio value='2'>Touch n Go E-wallets</Radio>
                        <Radio value='3'>iPay88</Radio>
                        <Radio value='4'>Sentel</Radio>
                    </Stack>
                </RadioGroup>
            </CardBody>
        </Card>
    )
}

export default PaymentMethod