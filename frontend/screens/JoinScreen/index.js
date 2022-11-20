import {View, Text, ScrollView, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import agent from '../../agent';
import {Button} from 'native-base';
import {useDispatch, useSelector} from 'react-redux';
import {login} from '../../reducers/users';

const JoinScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const [parties, setParties] = useState([]);
  const user = useSelector(state => state.user);

  const onJoinHandler = party_uuid => {
    agent.Parties.join(party_uuid)
      .then(res => {
        console.log(res.data);
        if (res.data.status === 'success') {
          setParties(parties.filter(party => party.party_uuid != party_uuid));
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

  useEffect(() => {
    agent.Parties.all(user.partiesJoined, user.partiesCreated)
      .then(res => {
        setParties(res.data.parties);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  return (
    <ScrollView
      style={styles.mainContainer}
      contentContainerStyle={{
        paddingTop: 15,
        paddingHorizontal: 10,
        display: 'flex',
        minHeight: '100%',
      }}>
      {parties[0] ? (
        parties.map(party => {
          const dateTime = new Date(party.date_time);
          return (
            <View key={party.party_uuid} style={styles.partyCard}>
              <Text style={styles.nameText}>{party.party_name}</Text>
              {party.description ? (
                <Text style={styles.descriptionText}>
                  "{party.description}"
                </Text>
              ) : null}
              <Button
                size="lg"
                backgroundColor={'main.200'}
                style={{width: '100%', marginTop: 15}}
                onPress={() => {
                  onJoinHandler(party.party_uuid);
                }}>
                Request to join
              </Button>
            </View>
          );
        })
      ) : (
        <View style={styles.noParties}>
          <Text style={styles.noPartiesText}>
            There are no parties at this time to join.
          </Text>
          <Button
            style={styles.noPartiesButton}
            _text={{fontWeight: '700', fontSize: 18}}
            onPress={() => {
              navigation.navigate('Create');
            }}>
            Click Here to Create One
          </Button>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    width: '100%',
  },
  partyCard: {
    borderColor: '#7209b7',
    borderWidth: 2,
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
  },
  nameText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 25,
  },
  locationText: {
    color: 'white',
  },
  descriptionText: {
    color: 'white',
    fontSize: 16,
    marginTop: 15,
  },
  dateText: {
    color: 'white',
  },
  noParties: {
    marginTop: 'auto',
    marginBottom: 'auto',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  noPartiesText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 25,
    textAlign: 'center',
    marginBottom: 20,
  },
  noPartiesButton: {
    width: '100%',
    backgroundColor: '#7209b7',
    marginBottom: 10,
  },
});

export default JoinScreen;
