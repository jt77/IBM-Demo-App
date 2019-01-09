/**
 * IMPORTANT
   create-react-app will look for this specific file
   and it will run this config file before it runs any test
   while in test mode. This allows us to not have to include
   this configuration at the top of every test file
 */

import Enzyme from "enzyme";
import EnzymeAdapter from "enzyme-adapter-react-16";

Enzyme.configure({adapter: new EnzymeAdapter()})