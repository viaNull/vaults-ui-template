#!/bin/bash

# Get the start time
start_time=$(date +%s)

# Source the utility script
source ./scripts/utils.sh

function print_exec_command() {
    local command=$1
    
    print_message "build-vercel.sh" "${command}"
    ${command}
}

# Function to perform build tasks
yarn_build() {
    local folder=$1
    local additional_cmd=$2
    cd ${folder}
    print_message "build-vercel.sh" "Building ${folder}..."
    
    if [ -n "${additional_cmd}" ]; then
        ${additional_cmd}
    fi

    yarn run build

    cd - &> /dev/null
}

print_message "Node version:"
node -v

print_exec_command "cd .." # in root dir

# Build tasks
yarn_build "drift-common/protocol/sdk" "bun add @project-serum/borsh"
yarn_build "drift-common/common-ts" ""
yarn_build "drift-common/icons" ""
yarn_build "drift-common/react" ""
yarn_build "drift-vaults/ts/sdk" ""

print_exec_command "cd ui" # in ui dir

# Build UI
yarn_build "."

# Get the end time
end_time=$(date +%s)

# Calculate and print the execution time
execution_time=$(expr $end_time - $start_time)
print_message "build-vercel.sh" "Execution time: ${execution_time} seconds"

print_message "build-vercel.sh" "Build completed."