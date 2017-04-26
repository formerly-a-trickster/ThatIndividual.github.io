import { connect } from "react-redux";

import Desktop from "../components/desktop";


function mapStateToProps(state: any) {
  return {
    windows: state.windows
  };
};

export default connect(
  mapStateToProps
)(Desktop);
