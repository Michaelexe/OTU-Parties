import {View, Text, StyleSheet, ScrollView} from 'react-native';
import React, {useState, useEffect} from 'react';
import agent from '../../agent';
import {Button} from 'native-base';
import {useDispatch, useSelector} from 'react-redux';
import {login} from '../../reducers/users';

const PartyInfo = ({route, navigation}) => {
  const dispatch = useDispatch();
  const party = route.params.party;
  const dateTime = new Date(party.date_time);
  const [members, setMembers] = useState([]);
  const user = useSelector(state => state.user);

  useEffect(() => {
    agent.Parties.members(party.party_uuid)
      .then(res => {
        console.log(res.data);
        setMembers(res.data.members);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  const leaveButtonHandler = () => {
    if (party.member_status == 'host') {
      agent.Parties.deleteParty(party.party_uuid)
        .then(res => {
          if (res.data.status == 'success') {
            agent.User.getInfo()
              .then(res2 => {
                dispatch(login(res2.data));
                navigation.navigate('Main');
              })
              .catch(err => {
                console.log(err);
              });
          }
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      agent.Parties.leaveParty(party.party_uuid)
        .then(res => {
          if (res.data.status == 'success') {
            agent.User.getInfo()
              .then(res2 => {
                dispatch(login(res2.data));
                navigation.navigate('Main');
              })
              .catch(err => {
                console.log(err);
              });
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  };

  return (
    <ScrollView
      style={styles.mainContainer}
      contentContainerStyle={{
        paddingVertical: 15,
        paddingHorizontal: 10,
        display: 'flex',
        minHeight: '100%',
      }}>
      <View style={styles.infoCard}>
        <Text style={styles.partyLocation}>
          Location:{' '}
          <Text style={{color: '#4cc9f0', fontWeight: '500'}}>
            {party.location}
          </Text>
        </Text>
        <Text style={styles.partyTime}>
          On{' '}
          <Text style={{color: '#4cc9f0', fontWeight: '400'}}>
            {dateTime.toLocaleString('default', {
              month: 'short',
            })}{' '}
            {dateTime.getDate()}, {dateTime.getFullYear()}{' '}
          </Text>
          at{' '}
          <Text style={{color: '#4cc9f0', fontWeight: '400'}}>
            {dateTime.toLocaleTimeString('en-US', {
              hour: '2-digit',
              minute: '2-digit',
              hour12: true,
            })}
          </Text>
        </Text>
        {party.description ? (
          <Text style={styles.partyDescription}>"{party.description}"</Text>
        ) : null}
      </View>
      <Text style={styles.header}>Members: ({members.length})</Text>
      <View style={{borderBottomColor: 'grey', borderBottomWidth: 2}}>
        {members.map(member => (
          <View key={member.username} style={styles.memberCard}>
            <Text style={styles.memberName}>{member.username}</Text>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                marginLeft: 'auto',
              }}>
              {member.member_status == 'host' ? (
                <View style={styles.hostTag}>
                  <Text style={styles.hostTagText}>HOST</Text>
                </View>
              ) : null}
              {member.username == user.user.username ? (
                <View style={styles.youTag}>
                  <Text style={styles.youTagText}>YOU</Text>
                </View>
              ) : null}
            </View>
          </View>
        ))}
      </View>
      <Button
        style={styles.leaveButton}
        _text={{fontWeight: '700', fontSize: 18}}
        onPress={leaveButtonHandler}>
        {party.member_status == 'host' ? 'Delete Party' : 'Leave Party'}
      </Button>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    width: '100%',
    backgroundColor: '#111111',
  },
  infoCard: {
    borderColor: '#4cc9f0',
    borderWidth: 2,
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 10,
    marginBottom: 25,
  },
  partyLocation: {
    color: 'white',
    fontWeight: '700',
    fontSize: 20,
  },
  partyTime: {
    color: 'white',
    fontWeight: '500',
    fontSize: 20,
  },
  partyDescription: {
    color: 'white',
    fontWeight: '400',
    fontSize: 19,
    marginTop: 10,
  },
  header: {
    color: 'white',
    fontWeight: '800',
    fontSize: 30,
    marginBottom: 15,
  },
  memberCard: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    height: 60,
    borderTopColor: 'grey',
    borderTopWidth: 2,
    paddingHorizontal: 10,
  },
  memberName: {
    color: 'white',
    fontWeight: '700',
    fontSize: 20,
  },
  hostTag: {
    backgroundColor: 'orange',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 100,
  },
  hostTagText: {
    fontWeight: '900',
    fontSize: 15,
    color: 'black',
  },
  youTag: {
    backgroundColor: 'green',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 100,
    marginLeft: 10,
  },
  youTagText: {
    fontWeight: '900',
    fontSize: 15,
    color: 'white',
  },
  leaveButton: {
    marginTop: 'auto',
    backgroundColor: 'red',
  },
});

export default PartyInfo;
