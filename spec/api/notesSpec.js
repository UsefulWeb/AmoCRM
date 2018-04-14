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
      .then( lead => client.Note.of(
        {
          element_id: lead.id,
          element_type: client.Note.ELEMENT_TYPE.LEAD,
          text: 'Hello from Moscow!'
        }
      ).save())
      .then( note => {
        expect( note.id ).toBeDefined();
        expect( note.element_id ).toBe( lead.id );
        done();
      });

  });

  it( 'should create note from notable behavior', done => {
    const lead = new client.Lead({
        name: 'lead form notes'
      }),
      note = new client.Note({
        text: 'Hello from Moscow!'
      });

    lead.save()
      .then( lead => lead.notes.add( note ))
      .then( note => {
        expect( note.id ).toBeDefined();
        expect( note.element_id ).toBe( lead.id );
        done();
      });

  });

  it( 'should check notable interface in all entities', () => {
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

  it( 'should create and update note', done => {
    const note = new client.Note({
      text: 'empty note'
    });
    note.save()
      .then(() => {
        note.text = 'empty note manager';
        note.updated_at = Math.floor( new Date / 1000 ) + 10;
        return note.save();
      })
      .then(() => client.Note.findById( note.id ))
      .then(({ text }) => {
        expect( text ).toBe( 'empty note manager' );
        done();
      });
  });

  it( 'should get notes for lead', done => {
    const lead = new client.Lead({
        name: 'lead form notes'
      }),
      note = new client.Note({
        text: 'Hello from Moscow!',
        note_type: client.Note.NOTE_TYPE.COMMON
      });

    lead.save()
      .then( lead => lead.notes.add( note ))
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
