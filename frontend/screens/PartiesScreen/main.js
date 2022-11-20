import {Button} from 'native-base';
import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';
import {useSelector} from 'react-redux';

const MainScreen = ({navigation}) => {
  const user = useSelector(state => state.user);
  return (
    <ScrollView
      style={styles.mainContainer}
      contentContainerStyle={{
        paddingTop: 15,
        paddingHorizontal: 10,
        display: 'flex',
        minHeight: '100%',
      }}>
      {user.partiesCreated[0] || user.partiesJoined[0] ? (
        <>
          {user.partiesCreated[0] ? (
            <>
              <Text style={styles.header}>Hosted</Text>
              {user.partiesCreated.map(party => {
                const dateTime = new Date(party.date_time);
                return (
                  <View
                    style={{...styles.partyCard, borderColor: '#b100e8'}}
                    key={party.party_uuid}>
                    <Text style={{...styles.nameText, color: '#b5179e'}}>
                      {party.party_name}
                    </Text>
                    <Text style={styles.locationText}>
                      Location:{' '}
                      <Text style={{color: '#b5179e', fontWeight: '500'}}>
                        {party.location}
                      </Text>
                    </Text>
                    <Text style={styles.dateText}>
                      On{' '}
                      <Text style={{color: '#b5179e', fontWeight: '400'}}>
                        {dateTime.toLocaleString('default', {
                          month: 'short',
                        })}{' '}
                        {dateTime.getDate()}, {dateTime.getFullYear()}{' '}
                      </Text>
                      at{' '}
                      <Text style={{color: '#b5179e', fontWeight: '400'}}>
                        {dateTime.toLocaleTimeString('en-US', {
                          hour: '2-digit',
                          minute: '2-digit',
                          hour12: true,
                        })}
                      </Text>
                    </Text>
                    <Button
                      size="lg"
                      backgroundColor={'main.100'}
                      style={{width: '100%', marginTop: 15}}
                      onPress={() => {
                        navigation.navigate('Party Info', {party});
                      }}>
                      See More
                    </Button>
                  </View>
                );
              })}
            </>
          ) : null}
          {user.partiesJoined.filter(
            party => party.member_status == 'joined',
          )[0] ? (
            <>
              <Text style={styles.header}>Joined</Text>
              {user.partiesJoined
                .filter(party => party.member_status == 'joined')
                .map(party => {
                  const dateTime = new Date(party.date_time);
                  return (
                    <View
                      key={party.party_uuid}
                      style={{...styles.partyCard, borderColor: '#b5179e'}}>
                      <Text style={{...styles.nameText, color: '#f72585'}}>
                        {party.party_name}
                      </Text>
                      <Text style={styles.locationText}>
                        Location:{' '}
                        <Text style={{color: '#f72585', fontWeight: '500'}}>
                          {party.location}
                        </Text>
                      </Text>
                      <Text style={styles.dateText}>
                        On{' '}
                        <Text style={{color: '#f72585', fontWeight: '400'}}>
                          {dateTime.toLocaleString('default', {
                            month: 'short',
                          })}{' '}
                          {dateTime.getDate()}, {dateTime.getFullYear()}{' '}
                        </Text>
                        at{' '}
                        <Text style={{color: '#f72585', fontWeight: '400'}}>
                          {dateTime.toLocaleTimeString('en-US', {
                            hour: '2-digit',
                            minute: '2-digit',
                            hour12: true,
                          })}
                        </Text>
                      </Text>
                      <Button
                        size="lg"
                        backgroundColor={'main.50'}
                        style={{width: '100%', marginTop: 15}}
                        onPress={() => {
                          navigation.navigate('Party Info', {party});
                        }}>
                        See More
                      </Button>
                    </View>
                  );
                })}
            </>
          ) : null}
          {user.partiesJoined.filter(
            party => party.member_status == 'pending',
          )[0] ? (
            <>
              <Text style={styles.header}>Pending</Text>
              {user.partiesJoined
                .filter(party => party.member_status == 'pending')
                .map(party => {
                  return (
                    <View
                      key={party.party_uuid}
                      style={{...styles.partyCard, borderColor: '#4895ef'}}>
                      <Text style={{...styles.nameText, color: '#4cc9f0'}}>
                        {party.party_name}
                      </Text>
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
        </>
      ) : (
        <View style={styles.noParties}>
          <Text style={styles.noPartiesText}>
            You have not made or joined any parties.
          </Text>
          <Button
            style={styles.noPartiesButton}
            _text={{fontWeight: '700', fontSize: 18}}
            onPress={() => {
              navigation.navigate('Create');
            }}>
            Click Here to Create
          </Button>
          <Button
            style={styles.noPartiesButton}
            _text={{fontWeight: '700', fontSize: 18}}
            onPress={() => {
              navigation.navigate('Join');
            }}>
            Click here to Join
          </Button>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    width: '100%',
    backgroundColor: '#111111',
  },
  partyCard: {
    borderWidth: 2,
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  nameText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 26,
    lineHeight: 26,
    marginBottom: 10,
  },
  locationText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '700',
  },
  descriptionText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '500',
  },
  dateText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '500',
  },
  header: {
    color: 'white',
    fontWeight: '700',
    fontSize: 30,
    marginBottom: 15,
    textAlign: 'center',
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

export default MainScreen;
