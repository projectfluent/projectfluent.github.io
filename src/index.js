// vim: ts=4 et sts=4 sw=4

import React, {Fragment} from 'react';
import ReactDOM from 'react-dom';
import ftl from "@fluent/dedent";

import Example from './example';
import { TextInput, RadioInput, RangeInput } from "./controls";

const example0 = {
    locale: "en-US",
    translations: `\
# Simple things are simple.
hello-user = Hello, {$userName}!

# Complex things are possible.
shared-photos =
    {$userName} {$photoCount ->
        [one] added a new photo
       *[other] added {$photoCount} new photos
    } to {$userGender ->
        [male] his stream
        [female] her stream
       *[other] their stream
    }.`,
    externals: {
        userName: "Anne",
        userGender: "female",
        photoCount: 3,
    }
};

function Example0() {
    return (
        <Example {...example0}>
            <TextInput name="userName" />
            <RadioInput name="userGender" options={["male", "female", "unspecified"]} />
            <RangeInput name="photoCount" min="1" max="9" step="1" />
        </Example>
    );
}

ReactDOM.render(
   <Example0 />,
   document.getElementById('demo-app')
);

const example1 = {
    locale: "en-US",
    translations: ftl`
        tabs-close-warning =
            You are about to close {$count} tabs.
            Are you sure you want to continue?

        -sync-brand-name = Firefox Account

        sync-dialog-title = {-sync-brand-name}
        sync-headline-title =
            {-sync-brand-name}: The best way to bring
            your data always with you
        sync-signedout-title =
            Connect with your {-sync-brand-name}
        `,
    externals: {
        count: 2,
    }
};

ReactDOM.render(
    <Example {...example1}>
        <RangeInput name="count" min="2" max="9" step="1" />
    </Example>,
    document.getElementById('example1-app')
);


const example2 = {
    locale: "it",
    translations: ftl`
        tabs-close-warning =
            Verranno chiuse {$count} schede. Proseguire?

        -sync-brand-name = {$capitalization ->
           *[uppercase] Account Firefox
            [lowercase] account Firefox
        }

        sync-dialog-title = {-sync-brand-name}
        sync-headline-title =
            {-sync-brand-name}: il modo migliore
            per avere i tuoi dati sempre con te
        sync-signedout-title =
            Connetti il tuo {-sync-brand-name(capitalization: "lowercase")}
        `,
    externals: {
        count: 2,
    }
};

ReactDOM.render(
    <Example {...example2}>
        <RangeInput name="count" min="2" max="9" step="1" />
    </Example>,
    document.getElementById('example2-app')
);


const example3 = {
    locale: "pl",
    translations: ftl`
        tabs-close-warning = {$count ->
            [few] Zostaną zamknięte {$count} karty.
                  Czy chcesz kontynuować?
           *[other] Zostanie zamkniętych {$count} kart.
                    Czy chcesz kontynuować?
        }

        -sync-brand-name = {$case ->
           *[nominative] Konto Firefox
            [genitive] Konta Firefox
            [accusative] Kontem Firefox
        }

        sync-dialog-title = {-sync-brand-name}
        sync-headline-title =
            {-sync-brand-name}: Najlepszy sposób na to,
            aby mieć swoje dane zawsze przy sobie
        sync-signedout-title =
            Zaloguj do {-sync-brand-name(case: "genitive")}
        `,
    externals: {
        count: 2,
    }
};

ReactDOM.render(
    <Example {...example3}>
        <RangeInput name="count" min="2" max="9" step="1" />
    </Example>,
    document.getElementById('example3-app')
);
