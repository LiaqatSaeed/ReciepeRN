const React = require('react-native');
const { Dimensions, Platform } = React;
const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;
const imgWidth = deviceWidth > 480 ? 330 : 230;
const imgheight = deviceWidth > 480 ? 130 : 100;
const TopHeadingFontSize = deviceWidth > 480 ? 24 : 16;

export const TColors = { bgSecondary: "#3E83FF" };

export const DynamicP = (t, b, r, l) => {
  return {
    paddingTop: t,
    paddingBottom: b,
    paddingRight: r,
    paddingLeft: l,

  };
};

export const DynamicM = (t, b, r, l) => {
  return {
    marginTop: t,
    marginBottom: b,
    marginRight: r,
    marginLeft: l,
  };
};

export const DynamicFntW = weight => {
  return {
    fontWeight: weight,
  };
};

export const DynamicFntSize = weight => {
  return {
    fontSize: weight,
  };
};

export const DynamicWidth = width => {
  return {
    width: width,
  };
};

export const DynamicHeight = height => {
  return {
    height: height,
  };
};

export const DynamicBgColor = index => {
  return {
    backgroundColor: DynamicColor(index),
  };
};

export const DynamicTColor = index => {
  return {
    color: DynamicColor(index),
  };
};

export const DynamicBorderColor = index => {
  return {
    borderColor: DynamicColor(index),
    borderWidth: 1,
  };
};

export const DynamicBorderPosition = (width, Top, Bottom, Right, Left) => {
  return {
    borderWidth: width,
    borderRightColor: Right,
    borderBottomColor: Bottom,
    borderLeftColor: Left,
    borderTopColor: Top,
  };
};

export const DynamicBDRadius = index => {
  return {
    borderRadius: index,
  };
};

export const DynamicOpacity = index => {
  return {
    opacity: index,
  };
};

export const DynamicColor = index => {
  var Color = '';
  switch (index) {
    case 1:
      Color = TColors.ThemeDarkG;
      break;
    case 2:
      Color = TColors.ThemeLightG;
      break;
    case 3:
      Color = TColors.ThemePurple;
      break;
    case 4:
      Color = TColors.ThemeBlackBold;
      break;
    case 5:
      Color = TColors.ThemeWhite;
      break;
    case 6:
      Color = TColors.ThemeBgColor;
      break;
    case 7:
      Color = TColors.ThemeTransparentWhite;
      break;
    case 8:
      Color = TColors.ThemeBGGrayblue;
    case 9:
      Color = 'transparent';
    default:
      Color = 'transparent';
      break;
  }
  return Color;
};

export default {
  fontFamily: 'Lato',
  imgResponsive: {
    width: imgWidth,
    height: imgheight,
  },
  defaultColor: '#1ec8c8',
  bgColor: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    backgroundColor: 'rgba(0,126,255,1)',
  },
  backbtn: {
    // backgroundColor: 'rgba(255, 255, 255, 0.3)',
    height: 30,
    width: 30,
    paddingLeft: 0,
    paddingRight: 0,
    borderRadius: 40 / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullHeight: deviceHeight,
  fullWidth: deviceWidth,
  BoxShadow: {
    shadowColor: '#D6E2F6',
    shadowOffset: {
      width: 5,
      height: 3,
    },
    shadowOpacity: 0.5,
    shadowRadius: 0.5,

    elevation: 3,
  },

  BtnTxt: {
    textTransform: 'capitalize',
    fontWeight: '400',
    fontSize: 20,
    paddingBottom: 2,
  },
  btnSize: {
    width: deviceWidth - 110,
  },
  TopHeading: {
    fontWeight: '600',
    fontSize: TopHeadingFontSize,
    color: '#1d364b',
  },

  //Standard Input
  stdInput: {
    backgroundColor: '#F0F4F8',
    borderRadius: 5,
  },

  // Text Transformation
  uppercase: {
    textTransform: 'uppercase',
  },

  white: {
    color: 'white',
  },
  textColor: {
    color: '#8193AE',
  },

  //Colors
  LinkColor: {
    color: '#0000EE',
  },
  txtColorSub: {
    color: '#484848',
  },
  txtWhite: {
    color: 'white',
  },

  //Border Colors
  borderGraishBlue: {
    borderColor: '#c2cad8',
  },
  borderBlue: {
    borderColor: '#0070d2',
  },
  //BG Colors
  themeBg: {
    backgroundColor: '#0070d2',
  },
  Bgwhite: {
    backgroundColor: 'white',
  },
  BgGray: {
    backgroundColor: '#e9e9e9',
  },
  BgError: {
    color: '#dc3545',
  },
  BgWarring: {
    color: '#ffc107',
  },
  //Text Alingment
  textCenter: {
    textAlign: 'center',
  },
  /////////////////////////
  //Padding Left 10

  // fontSizes
  fntS14: {
    fontSize: 14,
  },
  fntW700: {
    fontWeight: '700',
  },

  //Alingments
  vhc: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  vhend: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  vchb: {
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  vbhc: {
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  vthc: {
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  hb: {
    alignItems: 'flex-end',
  },
  vc: {
    justifyContent: 'center',
  },
  hc: {
    alignItems: 'center',
  },
  vcht: {
    justifyContent: 'center',
    alignItems: 'flex-start',
  },

  selfBaseline: {
    alignSelf: 'baseline',
  },

  spaceBetween: {
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  stretchBetween: {
    alignSelf: 'stretch',
    justifyContent: 'space-between',
  },
  //Directions
  col: { flexDirection: 'column' },
  row: { flexDirection: 'row' },

  //Shadows
  noShadow: {
    shadowOffset: { height: 0, width: 0 },
    shadowOpacity: 0,
    elevation: 0,
  },

  shadowD3: {
    shadowColor: '#fafafe',
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.14,
    shadowRadius: 6.27,

    elevation: 8,
  },

  //Card
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#072858',
  },
  cardSubTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#3E83FF',
  },
};

export { };
