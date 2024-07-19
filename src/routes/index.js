import * as screens from '../views';

const routesHandler = [
    {
        name: 'Chats',
        path: '/chats',
        component: screens?.Chats,
        headerShown: false,
        isTabView: true,
        isAuthenticate: true
    },
    {
        name: 'Updates',
        path: '/updates',
        component: screens?.Updates,
        headerShown: false,
        isTabView: true,
        isAuthenticate: true
    },
    {
        name: 'Communities',
        path: '/community',
        component: screens?.Community,
        headerShown: false,
        isTabView: true,
        isAuthenticate: true
    },
    {
        name: 'Calls',
        path: '/calls',
        component: screens?.Calls,
        headerShown: false,
        isTabView: true,
        isAuthenticate: true
    },
    {
        name: 'ChatDetails',
        path: '/chatdetails',
        component: screens?.ChatDetails,
        headerShown: false,
        isTabView: false,
        isAuthenticate: true
    },
    {
        name: 'VideoCall',
        path: '/videocall',
        component: screens?.VideoCall,
        headerShown: false,
        isTabView: false,
        isAuthenticate: true
    },
    {
        name: 'LandingScreen',
        path: '/LandingScreen',
        component: screens?.LandingScreen,
        headerShown: false,
        isTabView: false,
        isAuthenticate: false
    },
    {
        name: 'AgreeandContinue',
        path: '/AgreeandContinue',
        component: screens?.AngreeandContinue,
        headerShown: false,
        isTabView: false,
        isAuthenticate: false
    },
    {
        name: 'MobileNumber',
        path: '/MobileNumber',
        component: screens?.MobileNumber,
        headerShown: false,
        isTabView: false,
        isAuthenticate: false
    },
    {
        name: 'LinkasCompanion',
        path: '/LinkasCompanion',
        component: screens?.LinkasCompanion,
        headerShown: false,
        isTabView: false,
        isAuthenticate: false
    },
    {
        name: 'Help',
        path: '/Help',
        component: screens?.Help,
        headerShown: false,
        isTabView: false,
        isAuthenticate: false
    },
    {
        name: 'AppLanguages',
        path: '/AppLanguages',
        component: screens?.AppLanguages,
        headerShown: false,
        isTabView: false,
        isAuthenticate: false
    },
    {
        name: 'ContactSupport',
        path: '/ContactSupport',
        component: screens?.ContactSupport,
        headerShown: false,
        isTabView: false,
        isAuthenticate: false
    },
    {
        name: 'CountryQueve',
        path: '/CountryQueve',
        component: screens?.CountryQueve,
        headerShown: false,
        isTabView: false,
        isAuthenticate: false
    },
    {
        name: 'SearchHelpCentre',
        path: '/SearchHelpCentre',
        component: screens?.SearchHelpCentre,
        headerShown: false,
        isTabView: false,
        isAuthenticate: false
    }
]

export {
    routesHandler
}