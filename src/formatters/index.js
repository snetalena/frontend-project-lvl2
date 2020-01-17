import renderIdent from './renderIdent';
import renderPlain from './renderPlain';
import renderJson from './renderJson';

const getRender = (format) => {
  switch (format) {
    case 'plain':
      return renderPlain;
    case 'json':
      return renderJson;
    default:
      return renderIdent;
  }
};

export default getRender;
