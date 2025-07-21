



const objectPagination = (objectPagination:any , query:any , countProducts:number )=>{
    if(query.page){
        objectPagination.currentPage=parseInt(query.page);
       }
       objectPagination.skip=(objectPagination.currentPage-1)*objectPagination.limitPage;

       
            const totalPage = (countProducts/objectPagination.limitPage);
            objectPagination.totalPage=Math.ceil(totalPage);
            return objectPagination;

}
export default objectPagination;