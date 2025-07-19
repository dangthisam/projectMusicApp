const fs =require("fs-extra")

const listFileCopy=[
{
    sourceDir :"views",
    targetDir:"dist/views"
},
{
    sourceDir :"public",
    targetDir:"dist/public"

}
]


listFileCopy.forEach(async(item)=>{
    fs.copy(item.sourceDir, item.targetDir,( err) => {
  if (err) return console.error(err)
  console.log('success!')
})

})