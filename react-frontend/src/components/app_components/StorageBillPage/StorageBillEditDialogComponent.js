/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import client from "../../../services/restClient";
import _ from "lodash";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";

const getSchemaValidationErrorsStrings = (errorObj) => {
  let errMsg = {};
  for (const key in errorObj.errors) {
    if (Object.hasOwnProperty.call(errorObj.errors, key)) {
      const element = errorObj.errors[key];
      if (element?.message) {
        errMsg.push(element.message);
      }
    }
  }
  return errMsg.length ? errMsg : errorObj.message ? errorObj.message : null;
};

const StorageBillEditDialogComponent = (props) => {
  const [_entity, set_entity] = useState({});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const urlParams = useParams();

  useEffect(() => {
    set_entity(props.entity);
  }, [props.entity, props.show]);

  const onSave = async () => {
    let _data = {
      type: _entity?.type,
      gbStored: _entity?.gbStored,
      gbDownloaded: _entity?.gbDownloaded,
      uploadOperations: _entity?.uploadOperations,
      downloadOperations: _entity?.downloadOperations,
      bucketsPerProject: _entity?.bucketsPerProject,
    };

    setLoading(true);
    try {
      const result = await client
        .service("storageBill")
        .patch(_entity._id, _data);
      props.onHide();
      props.alert({
        type: "success",
        title: "Edit info",
        message: "Info storageBill updated successfully",
      });
      props.onEditResult(result);
    } catch (error) {
      console.debug("error", error);
      setError(
        getSchemaValidationErrorsStrings(error) || "Failed to update info",
      );
      props.alert({
        type: "error",
        title: "Edit info",
        message: "Failed to update info",
      });
    }
    setLoading(false);
  };

  const renderFooter = () => (
    <div className="flex justify-content-end">
      <Button
        label="save"
        className="p-button-text no-focus-effect"
        onClick={onSave}
        loading={loading}
      />
      <Button
        label="close"
        className="p-button-text no-focus-effect p-button-secondary"
        onClick={props.onHide}
      />
    </div>
  );

  const setValByKey = (key, val) => {
    let new_entity = { ..._entity, [key]: val };
    set_entity(new_entity);
    setError({});
  };

  return (
    <Dialog
      header="Edit Storage Bill"
      visible={props.show}
      closable={false}
      onHide={props.onHide}
      modal
      style={{ width: "40vw" }}
      className="min-w-max scalein animation-ease-in-out animation-duration-1000"
      footer={renderFooter()}
      resizable={false}
    >
      <div
        className="grid p-fluid overflow-y-auto"
        style={{ maxWidth: "55vw" }}
        role="storageBill-edit-dialog-component"
      >
        <div className="col-12 md:col-6 field">
          <span className="align-items-center">
            <label htmlFor="type">Type:</label>
            <InputText
              id="type"
              className="w-full mb-3 p-inputtext-sm"
              value={_entity?.type}
              onChange={(e) => setValByKey("type", e.target.value)}
            />
          </span>
          <small className="p-error">
            {!_.isEmpty(error["type"]) && (
              <p className="m-0" key="error-type">
                {error["type"]}
              </p>
            )}
          </small>
        </div>
        <div className="col-12 md:col-6 field">
          <span className="align-items-center">
            <label htmlFor="gbStored">GB stored:</label>
            <InputText
              id="gbStored"
              className="w-full mb-3 p-inputtext-sm"
              value={_entity?.gbStored}
              onChange={(e) => setValByKey("gbStored", e.target.value)}
            />
          </span>
          <small className="p-error">
            {!_.isEmpty(error["gbStored"]) && (
              <p className="m-0" key="error-gbStored">
                {error["gbStored"]}
              </p>
            )}
          </small>
        </div>
        <div className="col-12 md:col-6 field">
          <span className="align-items-center">
            <label htmlFor="gbDownloaded">GB downloaded:</label>
            <InputText
              id="gbDownloaded"
              className="w-full mb-3 p-inputtext-sm"
              value={_entity?.gbDownloaded}
              onChange={(e) => setValByKey("gbDownloaded", e.target.value)}
            />
          </span>
          <small className="p-error">
            {!_.isEmpty(error["gbDownloaded"]) && (
              <p className="m-0" key="error-gbDownloaded">
                {error["gbDownloaded"]}
              </p>
            )}
          </small>
        </div>
        <div className="col-12 md:col-6 field">
          <span className="align-items-center">
            <label htmlFor="uploadOperations">Upload operations:</label>
            <InputText
              id="uploadOperations"
              className="w-full mb-3 p-inputtext-sm"
              value={_entity?.uploadOperations}
              onChange={(e) => setValByKey("uploadOperations", e.target.value)}
            />
          </span>
          <small className="p-error">
            {!_.isEmpty(error["uploadOperations"]) && (
              <p className="m-0" key="error-uploadOperations">
                {error["uploadOperations"]}
              </p>
            )}
          </small>
        </div>
        <div className="col-12 md:col-6 field">
          <span className="align-items-center">
            <label htmlFor="downloadOperations">Download operations:</label>
            <InputText
              id="downloadOperations"
              className="w-full mb-3 p-inputtext-sm"
              value={_entity?.downloadOperations}
              onChange={(e) =>
                setValByKey("downloadOperations", e.target.value)
              }
            />
          </span>
          <small className="p-error">
            {!_.isEmpty(error["downloadOperations"]) && (
              <p className="m-0" key="error-downloadOperations">
                {error["downloadOperations"]}
              </p>
            )}
          </small>
        </div>
        <div className="col-12 md:col-6 field">
          <span className="align-items-center">
            <label htmlFor="bucketsPerProject">Buckets per project:</label>
            <InputText
              id="bucketsPerProject"
              className="w-full mb-3 p-inputtext-sm"
              value={_entity?.bucketsPerProject}
              onChange={(e) => setValByKey("bucketsPerProject", e.target.value)}
            />
          </span>
          <small className="p-error">
            {!_.isEmpty(error["bucketsPerProject"]) && (
              <p className="m-0" key="error-bucketsPerProject">
                {error["bucketsPerProject"]}
              </p>
            )}
          </small>
        </div>
        <div className="col-12">&nbsp;</div>
        <small className="p-error">
          {Array.isArray(Object.keys(error))
            ? Object.keys(error).map((e, i) => (
                <p className="m-0" key={i}>
                  {e}: {error[e]}
                </p>
              ))
            : error}
        </small>
      </div>
    </Dialog>
  );
};

const mapState = (state) => {
  const { user } = state.auth;
  return { user };
};
const mapDispatch = (dispatch) => ({
  alert: (data) => dispatch.toast.alert(data),
});

export default connect(mapState, mapDispatch)(StorageBillEditDialogComponent);
