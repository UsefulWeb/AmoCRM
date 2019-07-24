import AmoCRM from '../../src/AmoCRM';
import config from '../support/config';

let client;

beforeEach( done => {
  client = new AmoCRM( config );
  client
    .connect()
    .then( done );
});

describe( 'AmoCRM API Note Interface', () => {
  it( 'should create note', done => {
    const lead = new client.Lead({
      name: 'lead form notes'
    });

    lead.save()
      .then( lead => client.Note.from(
        {
          element_id: lead.id,
          element_type: client.Note.ELEMENT_TYPE.LEAD,
          text: 'Hello of Moscow!'
        }
      ).save())
      .then( note => {
        expect( note.id ).toBeDefined();
        expect( note.element_id ).toBe( lead.id );
        done();
      });

  });

  it( 'should create note of notable behavior', done => {
    const lead = new client.Lead({
        name: 'lead form notes'
      }),
      note = new client.Note({
        text: 'Hello of Moscow!'
      });

    lead.save()
      .then( lead => lead.notes.add([ note ]))
      .then( note => {
        expect( note.id ).toBeDefined();
        expect( note.element_id ).toBe( lead.id );
        done();
      });

  });

  it( 'should check notable interface in all factories', () => {
    const lead = new client.Lead,
      contact = new client.Contact,
      customer = new client.Customer,
      task = new client.Task,
      company = new client.Company;

    expect( lead.notes ).toBeDefined();
    expect( contact.notes ).toBeDefined();
    expect( customer.notes ).toBeDefined();
    expect( task.notes ).toBeDefined();
    expect( company.notes ).toBeDefined();
  });

  it( 'should get notes for lead', done => {
    const lead = new client.Lead({
        name: 'lead form notes'
      }),
      note = new client.Note({
        text: 'Hello of Moscow!',
        note_type: client.Note.NOTE_TYPE.COMMON
      });

    lead.save()
      .then( lead => lead.notes.add([ note ]))
      .then( note => note.fetch())
      .then( note => note.getElement())
      .then( lead => lead.notes.get(
        {
          note_type: client.Note.NOTE_TYPE.COMMON
        }
      ))
      .then( notes => {
        expect( notes.length ).toBe( 1 );
        expect( notes[ 0 ].id ).toBe( note.id );
        done();
      });
  });

});
