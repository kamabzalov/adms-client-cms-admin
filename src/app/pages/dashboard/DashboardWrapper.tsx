import { useAuth } from "../../modules/auth";
import { useQuery } from "react-query";
import { generateSiteKey, getMessages, getSiteKey } from "../../http/_requests";
import { useFormik } from "formik";
import React, { useState } from "react";
import { SiteKey } from "../../models/dashboard";

const DashboardPage = () => {
  const { currentUser } = useAuth();
  const [, setSiteKey] = useState<SiteKey | undefined>(undefined);
  const { data } = useQuery({
    queryKey: ["siteKey"],
    queryFn: () => getSiteKey(currentUser?.useruid),
    staleTime: Infinity,
  });

  const { data: messages } = useQuery({
    queryKey: ["messages"],
    queryFn: () => getMessages(currentUser?.useruid),
    staleTime: Infinity,
  });

  const formik = useFormik({
    initialValues: {
      siteKey: data?.apikey ?? "",
    },
    enableReinitialize: true,
    onSubmit: async () => {
      const newKey = await generateSiteKey(currentUser?.useruid);
      setSiteKey(newKey);
    },
  });
  return (
    <>
      <div className="row gy-5 g-xl-8">
        <div className="card">
          <div className="card-header border-0">
            <h3 className="card-title fw-bold text-dark">
              General site settings
            </h3>
          </div>
          <div className="card-body border-0 pt-0 pb-6">
            <form
              className="form row align-items-center"
              onSubmit={formik.handleSubmit}
            >
              <div className="col-12 col-md-6 mb-4">
                <div className="fw-row">
                  <label className="fw-bold fs-6 mb-2">Site key</label>
                  <input
                    placeholder="Site key"
                    type="text"
                    name="siteKey"
                    className="form-control form-control-solid mb-3 mb-lg-0"
                    autoComplete="off"
                    onChange={formik.handleChange}
                    value={formik.initialValues.siteKey}
                    disabled={true}
                  />
                </div>
              </div>
              <div className="col-12">
                <button type="submit" className="btn btn-primary me-3">
                  Generate new
                </button>
              </div>
            </form>
          </div>
        </div>
        {messages?.length && (
          <div className="card">
            <div className="card-header border-0">
              <h3 className="card-title fw-bold text-dark">
                Messages from site
              </h3>
            </div>
            <div className="card-body pt-0">
              {messages.map((message, index) => {
                return (
                  <div
                    key={message.id}
                    className="d-flex align-items-center mb-8"
                  >
                    <div className="flex-grow-1">
                      <span className="text-gray-800 text-hover-primary fw-bold fs-6">
                        Subject: {message.topic}
                      </span>
                      <span className="text-muted fw-semibold d-block">
                        Author: {message.nickname}
                      </span>
                      <span className="text-muted fw-semibold d-block">
                        Email: {message.email}
                      </span>
                      <span className="text-muted fw-semibold d-block">
                        Phone: {message.phone}
                      </span>
                      <span className="text-muted fw-semibold d-block">
                        Message: {message.message}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export const DashboardWrapper = () => {
  return (
    <>
      <DashboardPage />
    </>
  );
};
