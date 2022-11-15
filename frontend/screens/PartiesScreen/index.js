import React from 'react';
import {View, Text, ScrollView, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';

const PartiesScreen = () => {
  const user = useSelector(state => state.user);
  return (
    <ScrollView style={styles.mainContainer}>
      {user.partiesCreated[0] ? (
        <>
          <Text style={styles.header}>Hosted: </Text>
          {user.partiesCreated.map(party => {
            const dateTime = new Date(party.date_time);
            return (
              <View key={party.party_uuid} style={styles.partyCard}>
                <Text style={styles.nameText}>{party.party_name}</Text>
                <Text style={styles.locationText}>
                  Location: {party.location}
                </Text>
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
                  <Text style={styles.descriptionText}>
                    "{party.description}"
                  </Text>
                ) : null}
              </View>
            );
          })}
        </>
      ) : null}
      {user.partiesJoined.filter(
        party => party.member_status == 'joined',
      )[0] ? (
        <>
          <Text style={styles.header}>Joined: </Text>
          {user.partiesJoined
            .filter(party => party.member_status == 'joined')
            .map(party => {
              const dateTime = new Date(party.date_time);
              return (
                <View key={party.party_uuid} style={styles.partyCard}>
                  <Text style={styles.nameText}>{party.party_name}</Text>
                  <Text style={styles.locationText}>
                    Location: {party.location}
                  </Text>
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
                    <Text style={styles.descriptionText}>
                      "{party.description}"
                    </Text>
                  ) : null}
                </View>
              );
            })}
        </>
      ) : null}
      {user.partiesJoined.filter(
        party => party.member_status == 'pending',
      )[0] ? (
        <>
          <Text style={styles.header}>Pending: </Text>
          {user.partiesJoined
            .filter(party => party.member_status == 'pending')
            .map(party => {
              const dateTime = new Date(party.date_time);
              return (
                <View key={party.party_uuid} style={styles.partyCard}>
                  <Text style={styles.nameText}>{party.party_name}</Text>
                  <Text style={styles.locationText}>
                    Location: {party.location}
                  </Text>
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
                    <Text style={styles.descriptionText}>
                      "{party.description}"
                    </Text>
                  ) : null}
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
  header: {
    color: 'white',
    fontWeight: '800',
    fontSize: 30,
    marginBottom: 15,
  },
});

export default PartiesScreen;
