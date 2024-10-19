import PageTitle from "@/components/Typography/PageTitle";
import { SidebarContext } from "@/context/SidebarContext";
import ContactService from "@/services/ContactService";
import React, { useContext, useEffect, useState } from "react";
import {
  Table,
  TableHeader,
  TableCell,
  TableFooter,
  TableContainer,
  Input,
  Pagination,
  Textarea,
} from "@windmill/react-ui";
import EnquiryTable from "@/components/Enquiry/EnquiryTable";
import ContactTable from "@/components/Contact/ContactTable";
import "../style/custom-pagination.css"
import ReactPaginate from "react-paginate";
const Contact = () => {
  const {
    toggleDrawer,
    lang,
    currentPage,
    handleChangePage,
    searchText,
    category,
    sortedField,
    limitData,
  } = useContext(SidebarContext);
  const [contactInfo, setContactInfo] = useState([]);

  const getContact = () => {
    ContactService.getContact({ page: currentPage, limit: limitData }).then(
      (res) => {
        if (res?.success == true) {
          setContactInfo(res.contactForm);
        }
      }
    );
  };
  useEffect(() => {
    getContact();
  }, []);
  const pageCount = Math.ceil(contactInfo?.length / 10);

  return (
    <>
      <PageTitle>{" Contact"}</PageTitle>
      {contactInfo.length > 0 && (
        <TableContainer className="mb-8 rounded-b-lg">
          <Table>
            <TableHeader>
              <tr>
                <TableCell>{"UserName"}</TableCell>
                <TableCell>{"Email"}</TableCell>
                <TableCell>{"subject"}</TableCell>
                <TableCell>{"message "}</TableCell>
                <TableCell>{"status "}</TableCell>

              </tr>
            </TableHeader>
            <ContactTable
              lang={lang}
              //   isCheck={isCheck}
              contactInfo={contactInfo}
              //   setIsCheck={setIsCheck}
            />
          </Table>
          <TableFooter>
          {contactInfo?.length > 10 && (
              <div className="paginationOrder">
                <ReactPaginate
                  breakLabel="..."
                  nextLabel="Next"
                  onPageChange={(e) => handleChangePage(e.selected + 1)}
                  pageRangeDisplayed={3}
                  pageCount={pageCount}
                  previousLabel="Previous"
                  renderOnZeroPageCount={null}
                  pageClassName="page--item"
                  pageLinkClassName="page--link"
                  previousClassName="page-item"
                  previousLinkClassName="page-previous-link"
                  nextClassName="page-item"
                  nextLinkClassName="page-next-link"
                  breakClassName="page--item"
                  breakLinkClassName="page--link"
                  containerClassName="pagination"
                  activeClassName="activePagination"
                />
              </div>)}
            {/* <Pagination
              totalResults={contactInfo?.length}
              resultsPerPage={limitData}
              onChange={handleChangePage}
              label="Product Page Navigation"
            /> */}
          </TableFooter>
        </TableContainer>
      )}
    </>
  );
};

export default Contact;
