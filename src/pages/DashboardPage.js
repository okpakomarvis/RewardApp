import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getRewardStatus, claimReward } from '../redux/actions/rewardActions';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import Message from '../components/Message';
import Loader from '../components/Loader';
import CountdownTimer from '../countDown';

const DashboardPage = () => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const rewardStatus = useSelector((state) => state.rewardStatus);
  const { loading, error, reward } = rewardStatus;

  const rewardClaim = useSelector((state) => state.rewardClaim);
  const { loading: claimLoading, error: claimError, success } = rewardClaim;


  useEffect(() => {
    dispatch(getRewardStatus());
   
  }, [dispatch, reward]);

  const claimHandler = () => {
    dispatch(claimReward());
  };
   // Safely access reward properties
  //const rewardAvailable = reward ? reward.rewardAvailable : false;
  //const nextRewardTime = reward ? reward.nextRewardTime : '00:00:00';
  const subscriptionLevel = userInfo ? userInfo.subscriptionLevel : 'Basic';

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col xs={12} md={6}>
          <h1 className="text-center my-4">Dashboard</h1>
          
          <Card className="mb-4">
            <Card.Body>
              {loading || claimLoading ? (
        <Loader />
      ) : error || claimError ? (
        <Message variant="danger">{error || claimError}</Message>
      ) : (
        <>
          <Card.Title>Subscription Level: {subscriptionLevel }</Card.Title>
          {reward.rewardAvailable? (
            <Card.Text>
              <p>{reward.rewardPoints} points</p>
              <Button variant="primary" onClick={claimHandler} >
                Claim Reward
              </Button>
              </Card.Text>
          ) : (
            <Card.Text>
               Next Available Reward :  <CountdownTimer nextRewardTime={reward.nextRewardTime}/> 
              </Card.Text>
          )}
          {success && <Message variant="success">Reward claimed!</Message>}
        </>
      )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
    
  );
};

export default DashboardPage;
