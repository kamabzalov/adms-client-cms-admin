import { useAuth } from "../../modules/auth";
import { useQuery } from "react-query";
import { generateSiteKey, getSiteKey } from "../../http/_requests";
import { useFormik } from "formik";
import { useState } from "react";
import { SiteKey } from "../../models/dashboard";

const DashboardPage = () => {
  const { currentUser } = useAuth();
  const [siteKey, setSiteKey] = useState<SiteKey | undefined>(undefined);
  useQuery({
    queryKey: ["siteKey"],
    queryFn: () =>
      getSiteKey(currentUser?.useruid).then((response) => {
        if (response.apikey) {
          setSiteKey(response);
        }
      }),
    staleTime: Infinity,
  });

  const formik = useFormik({
    initialValues: {
      siteKey: siteKey?.apikey ?? "",
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
          <div className="card-body border-0 pt-6 pb-6">
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
            <div className="separator separator-dashed my-5"></div>
          </div>
        </div>
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
