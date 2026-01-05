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

const HostingEditDialogComponent = (props) => {
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
      storage: _entity?.storage,
      dataTransfer: _entity?.dataTransfer,
      domainSsl: _entity?.domainSsl,
      sitesPerProject: _entity?.sitesPerProject,
    };

    setLoading(true);
    try {
      const result = await client.service("hosting").patch(_entity._id, _data);
      props.onHide();
      props.alert({
        type: "success",
        title: "Edit info",
        message: "Info hosting updated successfully",
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
      header="Edit Hosting"
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
        role="hosting-edit-dialog-component"
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
            <label htmlFor="storage">Storage:</label>
            <InputText
              id="storage"
              className="w-full mb-3 p-inputtext-sm"
              value={_entity?.storage}
              onChange={(e) => setValByKey("storage", e.target.value)}
            />
          </span>
          <small className="p-error">
            {!_.isEmpty(error["storage"]) && (
              <p className="m-0" key="error-storage">
                {error["storage"]}
              </p>
            )}
          </small>
        </div>
        <div className="col-12 md:col-6 field">
          <span className="align-items-center">
            <label htmlFor="dataTransfer">Data transfer:</label>
            <InputText
              id="dataTransfer"
              className="w-full mb-3 p-inputtext-sm"
              value={_entity?.dataTransfer}
              onChange={(e) => setValByKey("dataTransfer", e.target.value)}
            />
          </span>
          <small className="p-error">
            {!_.isEmpty(error["dataTransfer"]) && (
              <p className="m-0" key="error-dataTransfer">
                {error["dataTransfer"]}
              </p>
            )}
          </small>
        </div>
        <div className="col-12 md:col-6 field">
          <span className="align-items-center">
            <label htmlFor="domainSsl">Domain & SSL:</label>
            <InputText
              id="domainSsl"
              className="w-full mb-3 p-inputtext-sm"
              value={_entity?.domainSsl}
              onChange={(e) => setValByKey("domainSsl", e.target.value)}
            />
          </span>
          <small className="p-error">
            {!_.isEmpty(error["domainSsl"]) && (
              <p className="m-0" key="error-domainSsl">
                {error["domainSsl"]}
              </p>
            )}
          </small>
        </div>
        <div className="col-12 md:col-6 field">
          <span className="align-items-center">
            <label htmlFor="sitesPerProject">Sites per project:</label>
            <InputText
              id="sitesPerProject"
              className="w-full mb-3 p-inputtext-sm"
              value={_entity?.sitesPerProject}
              onChange={(e) => setValByKey("sitesPerProject", e.target.value)}
            />
          </span>
          <small className="p-error">
            {!_.isEmpty(error["sitesPerProject"]) && (
              <p className="m-0" key="error-sitesPerProject">
                {error["sitesPerProject"]}
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

export default connect(mapState, mapDispatch)(HostingEditDialogComponent);
