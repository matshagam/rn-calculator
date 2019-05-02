import { StyleSheet, Platform, Dimensions } from 'react-native';

export const width = Dimensions.get('window').width;

export const buttons = [
  ['СОХР', 'ОЧИС', 'УДАЛ', '%'],
  ['7', '8', '9', ' ÷ '],
  ['4', '5', '6', ' x '],
  ['1', '2', '3', ' + '],
  ['.', '0', ' = ', ' - ']
];

export const initialOutput = '0';
export const maxLength = 17;

export const theme = {
  light: {
    primaryColor: '#fff',
    primaryColorTxt: '#000',
    secondaryColorTxt: '#7f8c8d'
  },
  dark: {
    primaryColor: '#000',
    primaryColorTxt: '#fff',
    secondaryColorTxt: '#7f8c8d'
  }
};

export const styles = StyleSheet.create({
  container: {
    ...Platform.select({
      ios: {
        paddingTop: 22
      }
    }),
    flex: 1,
    flexDirection: 'column'
  },
  contHistory: {
    flex: 0.45
  },
  contOutput: {
    flex: 0.25
  },
  contButtons: {
    flex: 0.9
  },
  placeHolderOutput: {
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingTop: 5,
    paddingHorizontal: 15
  },
  txtDefaultOutput: {
    fontFamily: 'Helvetica-Light',
    fontSize: 30,
    width: 'auto'
  },
  containerHistory: {
    flex: 1
  },
  clearCont: {
    height: 30,
    width: width,
    alignItems: 'center',
    paddingHorizontal: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    zIndex: 1
  },
  txtExpression: {
    fontFamily: 'Helvetica-Light',
    fontSize: 13
  },
  txtResult: {
    color: '#27ae60',
    fontFamily: 'Helvetica-Light',
    fontSize: 13
  },
  historyCont: {
    flex: 1,
    flexDirection: 'column',
    marginLeft: 15,
    marginRight: 15,
    paddingTop: 0,
    paddingBottom: 0,
    backgroundColor: 'transparent'
  },
  expressionCont: {
    flex: 0.7,
    paddingTop: 5,
    paddingBottom: 5,
    justifyContent: 'center',
    alignItems: 'flex-end',
    backgroundColor: 'transparent'
  },
  resultCont: {
    flex: 0.3,
    paddingTop: 5,
    paddingBottom: 5,
    justifyContent: 'center',
    alignItems: 'flex-end',
    backgroundColor: 'transparent'
  },
  emptyHistoryCont: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  txtEmptyHistory: {
    fontFamily: 'Helvetica-Light',
    fontSize: 15
  },
  buttonEmptyHistoryText: {
    fontFamily: 'Helvetica-Light',
    fontSize: 11
  },
  buttonsLeftSide: {
    flexDirection: 'row',
    alignItems: 'center',
    opacity: 0.5
  },
  modalView: {
    padding: 22,
    flex: 1,
    justifyContent: 'space-between'
  },
  containerMessage: {
    backgroundColor: '#F6F6F6',
    position: 'absolute',
    flex: 1,
    bottom: 0,
    width: '100%',
    height: 36,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    color: '#000',
    fontFamily: 'Helvetica-Light',
    fontSize: 16
  },
  containerNumbers: {
    flex: 1
  },
  txtDefault: {
    fontFamily: 'Helvetica-Light',
    fontSize: 20
  },
  contRow: {
    flex: 1,
    flexDirection: 'row'
  },
  contButton: {
    flex: 1,
    ...Platform.select({
      ios: {
        width: width / 4
      }
    }),
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.5
  },
  actionStyle: {
    backgroundColor: '#F2F2F2',
    borderColor: '#ffff'
  },
  equallyStyle: {
    backgroundColor: '#FECBCC'
  },
  numeralStyle: {
    backgroundColor: '#D7E4F5'
  }
});
