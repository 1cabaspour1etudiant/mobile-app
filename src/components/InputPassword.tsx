import React from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import { Icon, Input } from '@ui-kitten/components';

function InputPassword ({
    value = '',
    onChanchValue = (v:string) => {},
    status = '',
}, ref: React.LegacyRef<Input>) {
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
            ref={ref}
            value={value}
            placeholder='Mot de passe'
            accessoryRight={renderIcon}
            secureTextEntry={secureTextEntry}
            onChangeText={nextValue => onChanchValue(nextValue)}
            status={status}
        />
    );
};

export default React.forwardRef(InputPassword);
