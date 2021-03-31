import React from 'react';
import { TouchableWithoutFeedback, StyleProp, TextStyle } from 'react-native';
import { Icon, Input } from '@ui-kitten/components';

function InputPassword ({
    value = '',
    onChanchValue = (v:string) => {},
    status = '',
    style = {} as StyleProp<TextStyle>
}, ref: React.LegacyRef<Input>) {
    const [secureTextEntry, setSecureTextEntry] = React.useState(true);

    const toggleSecureEntry = () => {
        setSecureTextEntry(!secureTextEntry);
    };

    const renderIcon = (props:any) => (
        <TouchableWithoutFeedback onPress={toggleSecureEntry}>
            <Icon {...props} name={secureTextEntry ? 'eye' : 'eye-off'}/>
        </TouchableWithoutFeedback>
    );

    return (
        <Input
            ref={ref}
            value={value}
            placeholder='Mot de passe'
            accessoryRight={renderIcon}
            secureTextEntry={secureTextEntry}
            onChangeText={nextValue => onChanchValue(nextValue)}
            status={status}
            style={style}
        />
    );
};

export default React.forwardRef(InputPassword);
