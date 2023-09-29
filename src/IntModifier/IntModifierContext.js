import React from 'react';

export const IntModifierContext = React.createContext(
    {
        value: 'default',
        add: x => {}
    });
