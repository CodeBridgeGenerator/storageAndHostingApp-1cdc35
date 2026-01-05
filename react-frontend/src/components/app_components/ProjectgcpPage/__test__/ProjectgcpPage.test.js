import React from "react";
import { render, screen } from "@testing-library/react";

import ProjectgcpPage from "../ProjectgcpPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders projectgcp page", async () => {
  const store = init({ models });
  render(
    <Provider store={store}>
      <MemoryRouter>
        <ProjectgcpPage />
      </MemoryRouter>
    </Provider>,
  );
  expect(screen.getByRole("projectgcp-datatable")).toBeInTheDocument();
  expect(screen.getByRole("projectgcp-add-button")).toBeInTheDocument();
});
