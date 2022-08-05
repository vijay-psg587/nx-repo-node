### **LocalStack in local**

-   First start the localstack - `DEBUG=1 ENFORCE_IAM=1 LOCALSTACK_VOLUME_DIR=~/Documents/Code/Docker/data/localstack/ localstack start` - this starts in debug mode enforcing the IAM role if any
-   Create a seperate aws profile - named "localstak" and set that to be used for any awscli command (otherwise we have to install awslocal or create alias for the same with aws )
-   As a start create iam role with Admin permissions (just for development in local)`aws --endpoint-url=http://localhost:4566 iam create-role --role-name lstack_Admin_new \ --assume-role-policy-document file://apps/assets/localstack/iam/admin-role.json > ./apps/assets/localstack/output/iam/admin-role.json`
-   The output for this is in the same localstack folder
-   Now start the dynamodb service in local and create a db table named - `loc_table`

### **Database Details**

-   create table - loc_table - `aws --endpoint-url=http://0.0.0.0:4566 dynamodb create-table --cli-input-json file://apps/assets/localstack/dynamodb/loc_file.json > ./apps/assets/localstack/output/dynamodb/table.json`
-   create aws clients pointing to the default localstack - `http://localhost:4566`, so in local all services will be accessing localstack created entities. Just like dynamodb we can create many local services
