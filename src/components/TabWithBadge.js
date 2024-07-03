import React from "react";
import { View, Text } from "react-native";

// ** utils ** //
import { commonColors } from "../utils/colors";


const TabWithBadge = ({ name, badgeCount, color }) => {
  return <View>
    <Text style={{ color: color, fontSize: 12, }}>{name}</Text>
    {badgeCount > 0 && (
      <View
        style={{
          position: 'absolute',
          left: 40,
          top: 3,
          backgroundColor: color,
          borderRadius: 10,
          width: 16,
          height: 16,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Text style={{ color: commonColors?.teal?.[600], fontSize: 8, fontWeight: 'bold' }}>
          {badgeCount}
        </Text>
      </View>
    )}
  </View>
};

export default TabWithBadge;