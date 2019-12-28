import renderDefault from './renderDefault';
import renderPlain from './renderPlain';
import renderJson from './renderJson';

const getRender = (format) => {
  switch (format) {
    case 'plain':
      return renderPlain;
    case 'json':
      return renderJson;
    default:
      return renderDefault;
  }
};

export default getRender;
