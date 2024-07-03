import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { isEmpty } from 'lodash';

//** icons */
import AntDesign from 'react-native-vector-icons/AntDesign';

//** components */
import { MediaAction } from '../components';

//** utils */
import { commonColors } from '../utils/colors';

const MediaSelectionScreen = ({ setIsPreviewModal, acceptedPermission }) => {
  const [selectedMedia, setSelectedMedia] = useState({});
  const [selectedKey, setSelectedKey] = useState('');
  const [selectMediaAction, setSelectedMediaAction] = useState(false);

  const handleMediaPicker = (key) => {
    const options = {
      title: 'Select Media',
      mediaType: 'photo',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled media picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        setSelectedMedia({ ...selectedMedia, [key]: response?.assets[0] });
      }
    });
  };

  const handleSelectMedia = (key) => {
    if (acceptedPermission == true && isEmpty(selectedMedia?.[key])) {
      setIsPreviewModal(false);
      handleMediaPicker(key);
    } else if (acceptedPermission == true && !isEmpty(selectedMedia?.[key])) {
      setSelectedMediaAction(true);
      setSelectedKey(key)
    } else {
      setIsPreviewModal(true);
    }
  }

  const toggleMediaAction = (type) => {
    if (type === 'remove') {
      setSelectedMedia({ ...selectedMedia, [selectedKey]: {} });
      setSelectedMediaAction(false);
    } else {
      setSelectedMediaAction(false);
      handleMediaPicker(selectedKey);
    }
  }

  return (
    <View style={styles.container}>

      <Text style={styles.title}>Add screenshots (optional)</Text>

      <View style={styles.mediacontainer}>

        <View style={[styles.mediaselect, { marginRight: 8 }]}>
          <TouchableOpacity style={[styles.icon, { borderColor: !isEmpty(selectedMedia) ? commonColors?.coolGray?.[400] : 'transparent' }]} onPress={() => handleSelectMedia('key0')}>
            {!isEmpty(selectedMedia?.key0) ?
              <Image source={{ uri: selectedMedia?.key0?.uri }} style={styles.image} />
              : <AntDesign name='pluscircle' color={commonColors?.coolGray?.[400]} size={25} />
            }
          </TouchableOpacity>
        </View>

        <View style={[styles.mediaselect, { marginRight: 8 }]}>
          <TouchableOpacity style={[styles.icon, { borderColor: !isEmpty(selectedMedia) ? commonColors?.coolGray?.[400] : 'transparent' }]} onPress={() => handleSelectMedia('key1')}>
            {!isEmpty(selectedMedia?.key1) ?
              <Image source={{ uri: selectedMedia?.key1?.uri }} style={styles.image} />
              : <AntDesign name='pluscircle' color={commonColors?.coolGray?.[400]} size={25} />
            }
          </TouchableOpacity>
        </View>

        <View style={[styles.mediaselect, { marginRight: 8 }]}>
          <TouchableOpacity style={[styles.icon, { borderColor: !isEmpty(selectedMedia) ? commonColors?.coolGray?.[400] : 'transparent' }]} onPress={() => handleSelectMedia('key2')}>
            {!isEmpty(selectedMedia?.key2) ?
              <Image source={{ uri: selectedMedia?.key2?.uri }} style={styles.image} />
              : <AntDesign name='pluscircle' color={commonColors?.coolGray?.[400]} size={25} />
            }
          </TouchableOpacity>
        </View>

        {selectMediaAction && <MediaAction open={selectMediaAction} onPress={toggleMediaAction} />}

      </View>
    </View>
  );
};

export default MediaSelectionScreen;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    marginLeft: 20,
    marginTop: 30
  },
  title: {
    color: commonColors?.teal?.[600],
    fontSize: 13
  },
  mediaselect: {
    width: 80,
    height: 80,
    backgroundColor: commonColors?.coolGray?.[200],
    marginVertical: 20,
    borderRadius: 3
  },
  icon: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 3,
    width: 80,
    height: 80,
  },
  image: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 75,
    height: 75,
  },
  mediacontainer: {
    display: 'flex',
    flexDirection: 'row'
  },
})