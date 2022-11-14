import {View, Text, ScrollView, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import {Button, Input} from 'native-base';
import DateTimeInput from '../../components/DateTImeInput';
import agent from '../../agent';

const CreateScreen = () => {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [dateTime, setDateTime] = useState(new Date());
  const [description, setDescription] = useState('');

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
        console.log(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <ScrollView style={styles.mainContainer}>
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
            textStyle={{color: '#7209b7', fontSize: 18}}
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
            textStyle={{color: '#7209b7', fontSize: 18}}
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
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    width: '100%',
    paddingVertical: 15,
    paddingHorizontal: 10,
  },
  formContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
});

export default CreateScreen;
