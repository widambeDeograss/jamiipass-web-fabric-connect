export interface appStateInterface{
    isPageLoading:boolean;
    isDarkMode:boolean;
    isUserAuthenticated:boolean;
    token:string | null;
    isOrg:string;
    siderbar0pen:boolean;
    
}

export interface AlertInterface {
    id: number;
    title: string;
    message: string;
    type: string;
  }
  

export const appState:appStateInterface = {
    isPageLoading:false,
    isDarkMode:false,
    isUserAuthenticated:false,
    token:null,
    isOrg:"corpn",
    siderbar0pen:true,
}

export const alertState:AlertInterface[] = [];
