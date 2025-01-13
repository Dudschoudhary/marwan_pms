import { ErrorMessage, Field, Form, Formik } from "formik";


export type validationSchema = {
  name: string,
  coname: string,
  contact: number,
  description: string
}

export type TProps = {
  onSubmit: any
  initialValues:any
  validationSchema:any
  fields:any
}


const CustomForm = ({
  initialValues,
  validationSchema,
  onSubmit,
  fields,
}: TProps) => {

  return (
    <div className="m-5">
      <div className="flex justify-center items-center">
        <div className="border-2 border-gray-100 w-full p-6 rounded-xl space-y-6">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            enableReinitialize={true}
            onSubmit={onSubmit}
          >
            {({ isSubmitting, errors, touched }) => (
              <Form>
                {fields.map((field:any) => (
                  <div key={field.name} className="mb-4">
                    <div className="flex">
                      <label
                        htmlFor={field.name}
                        className="block text-sm font-medium text-gray-700"
                      >
                        {field.label}
                      </label>
                      <label
                        htmlFor={field.name}
                        className=" text-sm font-medium text-red-700 ml-1"
                      >
                        {field.required}
                      </label>
                    </div>

                    {field.type === "text-area" ? (
                      <Field
                        as="textarea"
                        id={field.name}
                        name={field.name}
                        placeholder={field.placeholder}
                        rows={5}
                        className={`mt-1 block w-full px-3 py-2 rounded-md min-h-[150px] max-h-[150px] shadow-sm focus:outline-none focus:ring-blue-500  sm:text-sm  ${errors[field.name] && touched[field.name] ? "border border-red-400 focus:border-red-400" : "border border-gray-300 focus:border-gray-400 "}`}
                      />
                    ) : (
                      <Field
                        id={field.name}
                        name={field.name}
                        type={field.type || "text"}
                        placeholder={field.placeholder}
                        className={`mt-1 block w-full px-3 py-2 border  rounded-md shadow-sm focus:outline-none focus:ring-blue-500  sm:text-sm ${errors[field.name] && touched[field.name] ? "border border-red-400" : "border border-gray-300 "}`}
                      />
                    )}
                    <ErrorMessage
                      name={field.name}
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>
                ))}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="mt-4 w-full bg-[#3c8dbc] text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none"
                >
                  Submit
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default CustomForm;
