import React from "react";
import { Link } from "react-router-dom";

/**A “breadcrumb” (or “breadcrumb trail”) is a type of secondary navigation 
scheme that reveals the user's location in a website or Web application. 
Dans le domaine des interfaces informatiques, le fil d'Ariane (traduit en 
anglais par le terme breadcrumb qui signifie miette de pain) décrit le 
chemin emprunté par un internaute pour se retrouver à l'endroit 
où il se situe à un moment T.*/

const BreadCrumb = (props) => {
  const { title } = props;
  return (
    <div className="Breadcrumb mb-0 py-4">
      <div className="container-xxl">
        <div className="row">
          <div className="col-12">
            <p className="text-center mb-0">
              <Link to="/" className="text-dark">
                Home &nbsp;
              </Link>
              / {title}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BreadCrumb;
