import {View, Text, ScrollView, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import agent from '../../agent';
import {Button} from 'native-base';
import {useSelector} from 'react-redux';

const JoinScreen = () => {
  const [parties, setParties] = useState([]);
  const user = useSelector(state => state.user);

  const onJoinHandler = party_uuid => {
    agent.Parties.join(party_uuid)
      .then(res => {
        console.log(res.data);
        if (res.data.status === 'success') {
          setParties(parties.filter(party => party.party_uuid != party_uuid));
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
    <ScrollView style={styles.mainContainer}>
      {parties.map(party => {
        const dateTime = new Date(party.date_time);
        return (
          <View key={party.party_uuid} style={styles.partyCard}>
            <Text style={styles.nameText}>{party.party_name}</Text>
            <Text style={styles.locationText}>Location: {party.location}</Text>
            <Text style={styles.dateText}>{`On ${dateTime.toLocaleString(
              'default',
              {
                month: 'short',
              },
            )} ${dateTime.getDate()}, ${dateTime.getFullYear()} at ${dateTime.toLocaleTimeString(
              'en-US',
              {
                hour: '2-digit',
                minute: '2-digit',
                hour12: true,
              },
            )}`}</Text>
            {party.description ? (
              <Text style={styles.descriptionText}>"{party.description}"</Text>
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
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    width: '100%',
    paddingVertical: 15,
    paddingHorizontal: 10,
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
  },
  dateText: {
    color: 'white',
  },
});

export default JoinScreen;
