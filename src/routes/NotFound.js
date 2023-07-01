import { Alert, Container } from "react-bootstrap";

const NotFound = () => {
    return (
        <Container>
            <Alert variant="danger">
                <Alert.Heading>Oh! Có lỗi ở đây! <b>404</b></Alert.Heading>
                <p>
                    Đường dẫn bạn đang truy cập hiện không có, hãy kiểm tra lại!
                </p>
            </Alert>
        </Container>
    );
}

export default NotFound;