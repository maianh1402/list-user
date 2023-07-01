import { Alert, Container } from 'react-bootstrap';
import { useSelector } from 'react-redux';

const PrivateRoutes = (props) => {
    const user = useSelector(state => state.user.account)

    if (user && !user.auth) {
        return (
            <Container>
                <Alert variant="danger" className='mt-3'>
                    <Alert.Heading>Oh! Có lỗi gì đó!</Alert.Heading>
                    <p>
                        Bạn phải đăng nhập mới sử dụng được tính năng này!
                    </p>
                </Alert>
            </Container>
        )
    }
    return (
        <>
            {props.children}
        </>
    );
}

export default PrivateRoutes;