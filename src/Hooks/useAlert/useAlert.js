import React, {useContext} from 'react'
import {SnackBarContext} from "../../Context/SnackbarContext";

const useAlert = () => useContext(SnackBarContext)

export default useAlert
