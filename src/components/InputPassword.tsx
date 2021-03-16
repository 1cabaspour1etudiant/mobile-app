import React from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import { Icon, Input } from '@ui-kitten/components';

const AlertIcon = (props:any) => (
  <Icon {...props} name='alert-circle-outline'/>
);

export default function InputPassword ({ value = '', onChanchValue = (v:string) => {} }) {
    const [secureTextEntry, setSecureTextEntry] = React.useState(true);

    const toggleSecureEntry = () => {
        setSecureTextEntry(!secureTextEntry);
    };

    const renderIcon = (props:any) => (
        <TouchableWithoutFeedback onPress={toggleSecureEntry}>
            <Icon {...props} name={secureTextEntry ? 'eye-off' : 'eye'}/>
        </TouchableWithoutFeedback>
    );

    return (
        <Input
        value={value}
        placeholder='Password'
        accessoryRight={renderIcon}
        secureTextEntry={secureTextEntry}
        onChangeText={nextValue => onChanchValue(nextValue)}
        />
    );
};