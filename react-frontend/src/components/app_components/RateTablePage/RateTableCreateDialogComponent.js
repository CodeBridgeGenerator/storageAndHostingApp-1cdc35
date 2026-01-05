import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import client from "../../../services/restClient";
import _ from "lodash";
import initilization from "../../../utils/init";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";

const getSchemaValidationErrorsStrings = (errorObj) => {
  let errMsg = {};
  for (const key in errorObj.errors) {
    if (Object.hasOwnProperty.call(errorObj.errors, key)) {
      const element = errorObj.errors[key];
      if (element?.message) {
        errMsg[key] = element.message;
      }
    }
  }
  return errMsg.length
    ? errMsg
    : errorObj.message
      ? { error: errorObj.message }
      : {};
};

const RateTableCreateDialogComponent = (props) => {
  const [_entity, set_entity] = useState({});
  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);
  const urlParams = useParams();

  useEffect(() => {
    let init = {};
    if (!_.isEmpty(props?.entity)) {
      init = initilization({ ...props?.entity, ...init }, [], setError);
    }
    set_entity({ ...init });
    setError({});
  }, [props.show]);

  const validate = () => {
    let ret = true;
    const error = {};

    if (!ret) setError(error);
    return ret;
  };

  const onSave = async () => {
    if (!validate()) return;
    let _data = {
      billType: _entity?.billType,
      category: _entity?.category,
      items: _entity?.items,
      description: _entity?.description,
      base: _entity?.base,
      unit: _entity?.unit,
      markUp10: _entity?.markUp10,
      finalAmount: _entity?.finalAmount,
      currency: _entity?.currency,
      planLimit: _entity?.planLimit,
      createdBy: props.user._id,
      updatedBy: props.user._id,
    };

    setLoading(true);

    try {
      const result = await client.service("rateTable").create(_data);
      props.onHide();
      props.alert({
        type: "success",
        title: "Create info",
        message: "Info Rate Table created successfully",
      });
      props.onCreateResult(result);
    } catch (error) {
      console.debug("error", error);
      setError(getSchemaValidationErrorsStrings(error) || "Failed to create");
      props.alert({
        type: "error",
        title: "Create",
        message: "Failed to create in Rate Table",
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
      header="Create Rate Table"
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
        role="rateTable-create-dialog-component"
      >
        <div className="col-12 md:col-6 field">
          <span className="align-items-center">
            <label htmlFor="billType">Bill Type:</label>
            <InputText
              id="billType"
              className="w-full mb-3 p-inputtext-sm"
              value={_entity?.billType}
              onChange={(e) => setValByKey("billType", e.target.value)}
            />
          </span>
          <small className="p-error">
            {!_.isEmpty(error["billType"]) ? (
              <p className="m-0" key="error-billType">
                {error["billType"]}
              </p>
            ) : null}
          </small>
        </div>
        <div className="col-12 md:col-6 field">
          <span className="align-items-center">
            <label htmlFor="category">Category:</label>
            <InputText
              id="category"
              className="w-full mb-3 p-inputtext-sm"
              value={_entity?.category}
              onChange={(e) => setValByKey("category", e.target.value)}
            />
          </span>
          <small className="p-error">
            {!_.isEmpty(error["category"]) ? (
              <p className="m-0" key="error-category">
                {error["category"]}
              </p>
            ) : null}
          </small>
        </div>
        <div className="col-12 md:col-6 field">
          <span className="align-items-center">
            <label htmlFor="items">Items:</label>
            <InputText
              id="items"
              className="w-full mb-3 p-inputtext-sm"
              value={_entity?.items}
              onChange={(e) => setValByKey("items", e.target.value)}
            />
          </span>
          <small className="p-error">
            {!_.isEmpty(error["items"]) ? (
              <p className="m-0" key="error-items">
                {error["items"]}
              </p>
            ) : null}
          </small>
        </div>
        <div className="col-12 md:col-6 field">
          <span className="align-items-center">
            <label htmlFor="description">Description:</label>
            <InputText
              id="description"
              className="w-full mb-3 p-inputtext-sm"
              value={_entity?.description}
              onChange={(e) => setValByKey("description", e.target.value)}
            />
          </span>
          <small className="p-error">
            {!_.isEmpty(error["description"]) ? (
              <p className="m-0" key="error-description">
                {error["description"]}
              </p>
            ) : null}
          </small>
        </div>
        <div className="col-12 md:col-6 field">
          <span className="align-items-center">
            <label htmlFor="base">Base:</label>
            <InputText
              id="base"
              className="w-full mb-3 p-inputtext-sm"
              value={_entity?.base}
              onChange={(e) => setValByKey("base", e.target.value)}
            />
          </span>
          <small className="p-error">
            {!_.isEmpty(error["base"]) ? (
              <p className="m-0" key="error-base">
                {error["base"]}
              </p>
            ) : null}
          </small>
        </div>
        <div className="col-12 md:col-6 field">
          <span className="align-items-center">
            <label htmlFor="unit">Unit:</label>
            <InputText
              id="unit"
              className="w-full mb-3 p-inputtext-sm"
              value={_entity?.unit}
              onChange={(e) => setValByKey("unit", e.target.value)}
            />
          </span>
          <small className="p-error">
            {!_.isEmpty(error["unit"]) ? (
              <p className="m-0" key="error-unit">
                {error["unit"]}
              </p>
            ) : null}
          </small>
        </div>
        <div className="col-12 md:col-6 field">
          <span className="align-items-center">
            <label htmlFor="markUp10">MarkUp (10%):</label>
            <InputNumber
              id="markUp10"
              className="w-full mb-3 p-inputtext-sm"
              value={_entity?.markUp10}
              onChange={(e) => setValByKey("markUp10", e.value)}
            />
          </span>
          <small className="p-error">
            {!_.isEmpty(error["markUp10"]) ? (
              <p className="m-0" key="error-markUp10">
                {error["markUp10"]}
              </p>
            ) : null}
          </small>
        </div>
        <div className="col-12 md:col-6 field">
          <span className="align-items-center">
            <label htmlFor="finalAmount">Final Amount:</label>
            <InputNumber
              id="finalAmount"
              className="w-full mb-3 p-inputtext-sm"
              value={_entity?.finalAmount}
              onChange={(e) => setValByKey("finalAmount", e.value)}
            />
          </span>
          <small className="p-error">
            {!_.isEmpty(error["finalAmount"]) ? (
              <p className="m-0" key="error-finalAmount">
                {error["finalAmount"]}
              </p>
            ) : null}
          </small>
        </div>
        <div className="col-12 md:col-6 field">
          <span className="align-items-center">
            <label htmlFor="currency">Currency:</label>
            <InputText
              id="currency"
              className="w-full mb-3 p-inputtext-sm"
              value={_entity?.currency}
              onChange={(e) => setValByKey("currency", e.target.value)}
            />
          </span>
          <small className="p-error">
            {!_.isEmpty(error["currency"]) ? (
              <p className="m-0" key="error-currency">
                {error["currency"]}
              </p>
            ) : null}
          </small>
        </div>
        <div className="col-12 md:col-6 field">
          <span className="align-items-center">
            <label htmlFor="planLimit">Plan Limit:</label>
            <InputText
              id="planLimit"
              className="w-full mb-3 p-inputtext-sm"
              value={_entity?.planLimit}
              onChange={(e) => setValByKey("planLimit", e.target.value)}
            />
          </span>
          <small className="p-error">
            {!_.isEmpty(error["planLimit"]) ? (
              <p className="m-0" key="error-planLimit">
                {error["planLimit"]}
              </p>
            ) : null}
          </small>
        </div>
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

export default connect(mapState, mapDispatch)(RateTableCreateDialogComponent);
