import { useEffect, useState } from "react";
import { useFormik } from "formik";
import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { object, string, number } from "yup";
import { editUserDetails, getUserDetails } from "../../Redux/Slices";
import Loader from "../../Components/Loading/Loader";
import "./Style.css";
import { IGetUserProps } from "../../Components/Interface/Interface";
import { useAppDispatch, useAppSelector } from "../../hooks";

export const DynamicForm = () => {
  const dispatch = useAppDispatch();
  const {
    getUser,
    editUser,
    isGetUserLoading,
    isEditDetailsLoading,
    editUserError,
  } = useAppSelector((state: any) => state.reducer);
  const [initialValue, setInitialValue] = useState<any>({});

  const [userValidation, setUserValidation] = useState<any>({});

  useEffect(() => {
    dispatch(getUserDetails());
  }, []);

  useEffect(() => {
    if (getUser.length) {
      let obj: any = {};
      getUser.forEach((element: IGetUserProps) => {
        if (
          element.type === "text" ||
          element.type === "select" ||
          element.type === "multiline"
        ) {
          obj[element.fieldName] = string().required(
            `Empty ${element.fieldName}`
          );
        }
        if (element.type === "email") {
          obj[element.fieldName] = string()
            .required(`Empty ${element.fieldName}`)
            .email(`Invalid ${element.fieldName}`);
        }
        if (element.type === "number") {
          obj[element.fieldName] = number().required(
            `Empty ${element.fieldName}`
          );
        }

        initialValue[element.fieldName] = element.value;
      });
      setUserValidation({ ...obj });
      setInitialValue({ ...initialValue });
    }
  }, [getUser]);

  const submitData = (data: any) => {
    dispatch(editUserDetails(data));
  };

  const formik = useFormik({
    initialValues: initialValue,
    validationSchema: object().shape({ ...userValidation }),
    onSubmit: submitData,
    enableReinitialize: true,
  });

  return (
    <>
      {isGetUserLoading ? (
        <Loader />
      ) : (
        <div className="userFormWrapper">
          <Grid container style={{ justifyContent: "center" }}>
            <Grid item lg={6}>
              <Typography variant="h6" className="dynamicFormHeading">
                Dynamic Form
              </Typography>
              <form onSubmit={formik.handleSubmit}>
                {getUser?.map((ele: IGetUserProps, i: number) => {
                  switch (ele.type) {
                    case "text":
                      return (
                        <div key={i}>
                          <TextField
                            fullWidth
                            type="text"
                            id={ele.fieldName}
                            name={ele.fieldName}
                            label={ele.fieldName}
                            onChange={formik.handleChange}
                            value={formik.values[ele.fieldName]}
                            error={Boolean(formik.errors[ele.fieldName])}
                            helperText={
                              formik.errors[ele.fieldName] &&
                              `${formik.errors[ele.fieldName]}`
                            }
                          />
                        </div>
                      );
                    case "email":
                      return (
                        <TextField
                          key={i}
                          fullWidth
                          id={ele.fieldName}
                          name={ele.fieldName}
                          label={ele.fieldName}
                          value={formik.values[ele.fieldName]}
                          onChange={formik.handleChange}
                          error={Boolean(formik.errors[ele.fieldName])}
                          helperText={
                            formik.errors[ele.fieldName] &&
                            `${formik.errors[ele.fieldName]}`
                          }
                        />
                      );
                    case "number":
                      return (
                        <TextField
                          key={i}
                          fullWidth
                          id={ele.fieldName}
                          name={ele.fieldName}
                          label={ele.fieldName}
                          value={formik.values[ele.fieldName]}
                          type="number"
                          onChange={formik.handleChange}
                          error={Boolean(formik.errors[ele.fieldName])}
                          helperText={
                            formik.errors[ele.fieldName] &&
                            `${formik.errors[ele.fieldName]}`
                          }
                        />
                      );
                    case "multiline":
                      return (
                        <TextField
                          key={i}
                          fullWidth
                          id={ele.fieldName}
                          name={ele.fieldName}
                          label={ele.fieldName}
                          value={formik.values[ele.fieldName]}
                          multiline
                          rows={4}
                          onChange={formik.handleChange}
                          error={Boolean(formik.errors[ele.fieldName])}
                          helperText={
                            formik.errors[ele.fieldName] &&
                            `${formik.errors[ele.fieldName]}`
                          }
                        />
                      );
                    case "select":
                      return (
                        <FormControl key={i} fullWidth>
                          <InputLabel id="demo-simple-select-label">
                            {ele.fieldName}
                          </InputLabel>
                          <Select
                            labelId="demo-simple-select-label"
                            id={ele.fieldName}
                            name={ele.fieldName}
                            label={ele.fieldName}
                            value={formik.values[ele.fieldName]}
                            defaultValue={ele.value}
                            onChange={formik.handleChange}
                          >
                            {ele?.options?.map((option: string, i: number) => {
                              return (
                                <MenuItem key={i} value={option}>
                                  {option}
                                </MenuItem>
                              );
                            })}
                          </Select>
                        </FormControl>
                      );
                  }
                })}
                <Box className="submitBtnWrapper" textAlign="center">
                  <Button
                    color="primary"
                    variant="contained"
                    type="submit"
                    disabled={isEditDetailsLoading ? true : false}
                  >
                    Submit
                  </Button>
                </Box>
              </form>
              {editUser?.data?.success && (
                <Box className="responseDataWrapper">
                  <Typography variant="subtitle1">Response</Typography>
                  <Typography variant="body1">
                    {editUser && JSON.stringify(editUser?.data)}
                  </Typography>
                </Box>
              )}
              {editUserError && (
                <Box className="ErrorWrapper">
                  <Typography variant="subtitle1">{editUserError}</Typography>
                </Box>
              )}
            </Grid>
          </Grid>
        </div>
      )}
    </>
  );
};

export default DynamicForm;
