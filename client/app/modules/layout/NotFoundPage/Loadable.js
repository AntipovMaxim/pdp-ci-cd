/**
 * Asynchronously loads the component for NotFoundPage
 */
import Loadable from 'react-loadable';

import LoadingIndicator from '../../../shared/components/LoadingIndicator';

export default Loadable({
  loader: () => import('.'),
  loading: LoadingIndicator,
});
