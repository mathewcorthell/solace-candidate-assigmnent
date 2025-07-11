# Future TODO
- **YEARS OF EXPERIENCE FILTER:** I fixed a bug where the years of experience as a search term wouldn't be correctly parsed out of the search term. Now, an integer in the search term will be considered a minimum years of experience. A better long-term fix would be to give a more granular UX where years of experience can be separately specified.
- **SPECIALTIES FILTER:** In the filter code, we are using `.include()` on both string values (e.g. first name) and array values (e.g. specialties). This will produce different behavior and allow for partial text matches on the strings, but require exact matches on the whole name of a specialty. A couple of fixes could be:
-- When filtering, iterate throught the specialties for each advocate and if any specialty for that advocate partially matches, include the advocate in the list.
-- Provide text input specifically for specialties, allowing the user to search for and select desired specialties, then use the selected specialties to filter the providers.
- **SPECIALTIES UX IMPROVEMENT** Consider shortening the the list of specialties shown by default and allow it to be expandable via "show more", or a modal.
