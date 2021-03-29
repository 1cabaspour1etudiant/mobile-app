import React, { useCallback, useState } from 'react';
import {
    TouchableWithoutFeedback,
    KeyboardTypeOptions,
} from 'react-native';
import {Input, Icon} from '@ui-kitten/components';

export type PropsOfInputUpdateInfos = {
    label:string;
    labelName:string;
    keyboardType:KeyboardTypeOptions;
    refInput: React.MutableRefObject<{
        label: string;
        disabled: boolean;
        value: string;
    }>
};

export default function InputUpdateInfos({ label, keyboardType, refInput }: PropsOfInputUpdateInfos) {
    const [value, setValue] = useState(label);
    const [disabled, setDisabled] = useState(true);

    const toggleOnValueChange = useCallback((value: string) => {
        setValue(value);
        refInput.current.value = value;
    }, [refInput]);

    const toggleUpdateEditingMode = useCallback(() => {
        setDisabled(!disabled);
        refInput.current.disabled = !disabled;
    }, [disabled]);

    const toggleRenderAccessoryRight = useCallback((props) => {
        return (
            <TouchableWithoutFeedback
                onPress={toggleUpdateEditingMode}
            >
                <Icon {...props} name={'edit-2-outline'}/>
            </TouchableWithoutFeedback>
        );
    }, [toggleUpdateEditingMode]);

    return (
        <Input
            disabled={disabled}
            value={disabled ? label : value}
            onChangeText={toggleOnValueChange}
            accessoryRight={toggleRenderAccessoryRight}
            keyboardType={keyboardType}
        />
    );
}
