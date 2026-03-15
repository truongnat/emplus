// Type declarations for react-native-vector-icons to fix React 19 conflicts
declare module "react-native-vector-icons" {
  import * as React from "react";

  export interface IconProps {
    name: string;
    size?: number;
    color?: string;
    style?: any;
  }

  export type Icon = React.ComponentType<IconProps>;
}

declare module "react-native-vector-icons/ionicons" {
  import * as React from "react";

  export interface IoniconsProps {
    name: string;
    size?: number;
    color?: string;
    style?: any;
  }

  export default class Ionicons extends React.Component<IoniconsProps> {}
}

declare module "react-native-vector-icons/material-community-icons" {
  import * as React from "react";

  export interface MaterialCommunityIconsProps {
    name: string;
    size?: number;
    color?: string;
    style?: any;
  }

  export default class MaterialCommunityIcons extends React.Component<MaterialCommunityIconsProps> {}
}
