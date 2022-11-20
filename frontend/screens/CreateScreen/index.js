import {View, Text, ScrollView, StyleSheet} from 'react-native';
import React, {useState, useEffect} from 'react';
import {Button, Input} from 'native-base';
import DateTimeInput from '../../components/DateTImeInput';
import agent from '../../agent';
import {useDispatch} from 'react-redux';
import {login} from '../../reducers/users';

const CreateScreen = () => {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [dateTime, setDateTime] = useState(new Date());
  const [description, setDescription] = useState('');
  const [requests, setRequests] = useState([]);
  const dispatch = useDispatch();

  const onSubmitHandler = () => {
    const formData = {
      location,
      date_time: `${dateTime.getFullYear()}-${
        dateTime.getMonth() + 1 < 10
          ? '0' + (dateTime.getMonth() + 1).toString()
          : dateTime.getMonth() + 1
      }-${dateTime.getDate()} ${dateTime.toLocaleTimeString('en-US')}`,
      party_name: name,
      description: description ? description : null,
    };

    agent.Parties.create(formData)
      .then(res => {
        if (res.data.status == 'success') {
          console.log(res.data);
          setDateTime(new Date());
          setDescription('');
          setLocation('');
          setName('');
          agent.User.getInfo()
            .then(res2 => {
              dispatch(login(res2.data));
            })
            .catch(err => {
              console.log(err);
            });
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  const acceptRequest = (party_uuid, user_uuid) => {
    agent.Parties.acceptRequest(party_uuid, user_uuid)
      .then(res => {
        console.log(res.data);
        if (res.data.status == 'success') {
          setRequests(
            requests.filter(
              request =>
                !(
                  request.party_uuid == party_uuid &&
                  request.user_uuid == user_uuid
                ),
            ),
          );
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  const declineRequest = (party_uuid, user_uuid) => {
    agent.Parties.declineRequest(party_uuid, user_uuid)
      .then(res => {
        console.log(res.data);
        if (res.data.status == 'success') {
          setRequests(
            requests.filter(
              request =>
                !(
                  request.party_uuid == party_uuid &&
                  request.user_uuid == user_uuid
                ),
            ),
          );
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  useEffect(() => {
    agent.Parties.requests()
      .then(res => {
        console.log(res.data);
        setRequests(res.data.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  return (
    <ScrollView
      style={styles.mainContainer}
      contentContainerStyle={{paddingTop: 15, paddingHorizontal: 10}}>
      <View style={styles.formContainer}>
        <Input
          variant="outline"
          placeholder="Party Name"
          size="2xl"
          color={'main.200'}
          focusOutlineColor={'main.200'}
          backgroundColor={''}
          marginBottom={3}
          value={name}
          onChange={e => {
            setName(e.nativeEvent.text);
          }}
        />
        <Input
          variant="outline"
          placeholder="Location"
          size="2xl"
          color={'main.200'}
          focusOutlineColor={'main.200'}
          backgroundColor={''}
          marginBottom={3}
          value={location}
          onChange={e => {
            setLocation(e.nativeEvent.text);
          }}
        />
        <View style={{display: 'flex', flexDirection: 'row', width: '100%'}}>
          <DateTimeInput
            mode="date"
            value={`${dateTime.toLocaleString('default', {
              month: 'short',
            })} ${dateTime.getDate()}, ${dateTime.getFullYear()}`}
            style={{
              width: '49%',
              marginRight: '1%',
              justifyContent: 'flex-start',
            }}
            textStyle={{color: '#b100e8', fontSize: 18}}
            marginBottom={3}
            state={dateTime}
            setState={setDateTime}
          />
          <DateTimeInput
            mode="time"
            value={dateTime.toLocaleTimeString('en-US', {
              hour: '2-digit',
              minute: '2-digit',
              hour12: true,
            })}
            style={{
              width: '49%',
              marginLeft: '1%',
              justifyContent: 'flex-start',
            }}
            textStyle={{color: '#b100e8', fontSize: 18}}
            marginBottom={3}
            state={dateTime}
            setState={setDateTime}
          />
        </View>
        <Input
          variant="outline"
          placeholder="Description (Optional)"
          size="2xl"
          color={'main.200'}
          focusOutlineColor={'main.200'}
          backgroundColor={''}
          marginBottom={5}
          value={description}
          onChange={e => {
            setDescription(e.nativeEvent.text);
          }}
        />
        <Button
          size="lg"
          backgroundColor={'main.200'}
          style={{width: '100%'}}
          isDisabled={!location || !name}
          onPress={onSubmitHandler}>
          Create Party
        </Button>
      </View>
      {requests[0] ? (
        <>
          <Text style={styles.header}>Request:</Text>
          {requests.map(request => {
            return (
              <View style={styles.requestCard} key={requests.indexOf(request)}>
                <Text style={styles.requestText}>
                  {request.username}{' '}
                  <Text style={styles.requestTextWhite}>
                    requested to join{' '}
                  </Text>
                  {request.party_name}
                </Text>
                <View style={styles.buttonContainer}>
                  <Button
                    style={{...styles.requestButton, marginRight: '1%'}}
                    backgroundColor="green.600"
                    _text={{
                      fontWeight: '700',
                      fontSize: 20,
                    }}
                    onPress={() => {
                      acceptRequest(request.party_uuid, request.user_uuid);
                    }}>
                    Accept
                  </Button>
                  <Button
                    style={{...styles.requestButton, marginLeft: '1%'}}
                    backgroundColor="red.500"
                    _text={{
                      fontWeight: '700',
                      fontSize: 20,
                    }}
                    onPress={() => {
                      declineRequest(request.party_uuid, request.user_uuid);
                    }}>
                    Decline
                  </Button>
                </View>
              </View>
            );
          })}
        </>
      ) : null}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    width: '100%',
  },
  formContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  header: {
    color: 'white',
    fontWeight: '800',
    fontSize: 30,
    marginVertical: 15,
  },
  requestCard: {
    borderColor: '#7209b7',
    borderWidth: 2,
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
  },
  requestText: {
    color: '#b5179e',
    fontWeight: '600',
    fontSize: 21,
  },
  requestTextWhite: {
    color: 'white',
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 15,
  },
  requestButton: {
    width: '48%',
    marginHorizontal: 'auto',
  },
});

export default CreateScreen;
