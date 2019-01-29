# Name: Max Simons
# ID: 12389285
# JSON & CSV converter

import csv
import json
import pandas as pd

# fill in input file name .csv
INPUT_FILE = "non_fatal_terrorism.csv"

# fill in output file name .json
OUTPUT_FILE = "non_fatal_terrorism.json"

def convert(INPUT_FILE):

    # read csv file with panda
    df = pd.read_csv(INPUT_FILE)

    # Change columns
    df = df.pivot(index='Country', columns='Year', values=['Incidents', 'Code'])

    df.columns = df.columns.map('{0[0]}|{0[1]}'.format)

    year = 1970

    for column in range(47):

        if 'Code|' + str(year) in df:

            df['Code|2017'] = df['Code|2017'].fillna(df['Code|' + str(year)])

            df.drop('Code|' + str(year), axis=1, inplace=True)

        year += 1

    # make json file based on records
    df.reset_index().to_json(OUTPUT_FILE, orient='records')

if __name__ == "__main__":
    convert(INPUT_FILE)
