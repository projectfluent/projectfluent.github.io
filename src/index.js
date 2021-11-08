// vim: ts=4 et sts=4 sw=4

import React, {Fragment} from 'react';
import ReactDOM from 'react-dom';
import ftl from "@fluent/dedent";

import Example from './example';
import { TextInput, RadioInput, RangeInput } from "./controls";

const example0 = {
    locale: "en-US",
    translations: ftl`
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
            }.
        `,
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
        ## Closing tabs

        tabs-close-button = Close
        tabs-close-tooltip = {$tabCount ->
            [one] Close {$tabCount} tab
           *[other] Close {$tabCount} tabs
        }
        tabs-close-warning =
            You are about to close {$tabCount} tabs.
            Are you sure you want to continue?

        ## Syncing

        -sync-brand-name = Firefox Account

        sync-dialog-title = {-sync-brand-name}
        sync-headline-title =
            {-sync-brand-name}: The best way to bring
            your data always with you
        sync-signedout-title =
            Connect with your {-sync-brand-name}
        `,
    externals: {
        tabCount: 2,
    },
    height: "30rem",
};

ReactDOM.render(
    <Example {...example1}>
        <RangeInput name="tabCount" min="2" max="9" step="1" />
    </Example>,
    document.getElementById('example1-app')
);


const example2 = {
    locale: "it",
    translations: ftl`
        ## Closing tabs

        tabs-close-button = Chiudi
        tabs-close-tooltip = {$tabCount ->
            [one] Chiudi {$tabCount} scheda
           *[other] Chiudi {$tabCount} schede
        }
        tabs-close-warning =
            Verranno chiuse {$tabCount} schede. Proseguire?

        ## Syncing

        -sync-brand-name = {$first ->
           *[uppercase] Account Firefox
            [lowercase] account Firefox
        }

        sync-dialog-title = {-sync-brand-name}
        sync-headline-title =
            {-sync-brand-name}: il modo migliore
            per avere i tuoi dati sempre con te
        sync-signedout-title =
            Connetti il tuo {-sync-brand-name(first: "lowercase")}
        `,
    externals: {
        tabCount: 2,
    },
    height: "30rem",
};

ReactDOM.render(
    <Example {...example2}>
        <RangeInput name="tabCount" min="2" max="9" step="1" />
    </Example>,
    document.getElementById('example2-app')
);


const example3 = {
    locale: "pl",
    translations: ftl`
        ## Closing tabs

        tabs-close-button = Zamknij
        tabs-close-tooltip = {$tabCount ->
            [one] Zamknij kartę
            [few] Zamknij {$tabCount} karty
           *[many] Zamknij { $tabCount } kart
        }
        tabs-close-warning = {$tabCount ->
            [few] Zostaną zamknięte {$tabCount} karty.
                  Czy chcesz kontynuować?
           *[many] Zostanie zamkniętych {$tabCount} kart.
                   Czy chcesz kontynuować?
        }

        ## Syncing

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
        tabCount: 2,
    },
    height: "37rem",
};

ReactDOM.render(
    <Example {...example3}>
        <RangeInput name="tabCount" min="2" max="9" step="1" />
    </Example>,
    document.getElementById('example3-app')
);



const example4 = {
    locale: "ar",
    translations: ftl`
    tabs-close-button = أغلق    
    tabs-count-full = {$tabCount ->
        [one] تبويب واحد
        [two] تبويبان
        [few] {$tabCount} تبوبات
        [many] {$tabCount} تبويبا
        *[other] {$tabCount} تبويب
    }
    tabs-close-tooltip = {tabs-close-button} {tabs-count-full}
    tabs-close-warning =
        أنت على وشك إغلاق  {tabs-count-full}.
        هل أنت متأكد من المواصالة؟
    
    ## Syncing
    
    -sync-brand-name = حساب فيرفوكس
    
    sync-dialog-title = {-sync-brand-name}
    sync-headline-title = {-sync-brand-name}: أفضل طريقة لتحمل بياناتك معك أينما كنت.
    sync-signedout-title =
        سجل الدخول بإستخدام {-sync-brand-name} الخاص بك.
    `,
    externals: {
        tabCount: 2,
    },
    height: "37rem",
};

ReactDOM.render(
    <Example {...example4}>
        <RangeInput name="tabCount" min="1" max="22" step="1" />
    </Example>,
    document.getElementById('example4-app')
);
